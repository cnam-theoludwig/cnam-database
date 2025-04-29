import { Faker, fr } from "@faker-js/faker"
import bcrypt from "bcryptjs"
import { database } from "./database.ts"

export const faker = new Faker({
  locale: [fr],
})
faker.seed(123)
faker.setDefaultRefDate("2025-04-29T12:00:00.000Z")

const AIRPLANES = {
  Airbus: {
    A319: {
      count: 9,
      fuelCapacityLiter: 30_190,
      priceCentsEuro: 89_000_000 * 100,
    },
    A320: {
      count: 82,
      fuelCapacityLiter: 23_430,
      priceCentsEuro: 25_000_000 * 100,
    },
    A321: {
      count: 32,
      fuelCapacityLiter: 30_030,
      priceCentsEuro: 150_000_000 * 100,
    },
    A350: {
      count: 28,
      fuelCapacityLiter: 317_000_000,
      priceCentsEuro: 350_000_000 * 100,
    },
  },
  Boeing: {
    B777: {
      count: 15,
      fuelCapacityLiter: 181_283,
      priceCentsEuro: 320_000_000 * 100,
    },
    B787: {
      count: 24,
      fuelCapacityLiter: 126_917,
      priceCentsEuro: 248_000_000 * 100,
    },
  },
}
const AIRPLANES_COUNT = Object.values(AIRPLANES).reduce((current, models) => {
  return (
    current +
    Object.values(models).reduce((current, { count }) => current + count, 0)
  )
}, 0)

const AVIATION_JOBS = {
  Pilot: {
    count: 248,
    salaryCentsEuroPerMonth: 10_000 * 100,
  },
  Copilot: {
    count: 248,
    salaryCentsEuroPerMonth: 7_500 * 100,
  },
  "Cabin crew": {
    count: 668,
    salaryCentsEuroPerMonth: 2_000 * 100,
  },
  "Aircraft mechanic": {
    count: 244,
    salaryCentsEuroPerMonth: 4_500 * 100,
  },
  "Customer service agent": {
    count: 757,
    salaryCentsEuroPerMonth: 2_000 * 100,
  },
  "Flight operations engineer": {
    count: 156,
    salaryCentsEuroPerMonth: 4_500 * 100,
  },
}

const PASSENGERS_COUNT = 100_000
const CUSTOMERS_COUNT = 1_000
// const FLIGHTS_COUNT_EVERY_DAY = 200

const CHUNK_SIZE = 1_000

const registrationNumbers = faker.helpers.uniqueArray(() => {
  return faker.string.alphanumeric(6).toUpperCase()
}, AIRPLANES_COUNT)
await database
  .insertInto("airplane")
  .values(
    Object.entries(AIRPLANES).flatMap(([brand, models]) => {
      return Object.entries(models).flatMap(([model, modelInfo]) => {
        return Array.from({ length: modelInfo.count }).map(() => {
          return {
            registration_number: registrationNumbers.pop() as string,
            brand: brand as keyof typeof AIRPLANES,
            model,
            fuel_capacity_liter: faker.number.int({
              min: modelInfo.fuelCapacityLiter - 10_000,
              max: modelInfo.fuelCapacityLiter + 10_00,
            }),
            price_cents_euro: faker.number.int({
              min: modelInfo.priceCentsEuro - 2_000_000,
              max: modelInfo.priceCentsEuro + 2_000_000,
            }),
          }
        })
      })
    }),
  )
  .executeTakeFirstOrThrow()

await database
  .insertInto("employee")
  .values(
    Object.entries(AVIATION_JOBS).flatMap(
      ([job, { count, salaryCentsEuroPerMonth }]) => {
        return Array.from({ length: count }).map(() => {
          return {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName().toUpperCase(),
            job: job as keyof typeof AVIATION_JOBS,
            hire_date: faker.date.past({
              years: 10,
            }),
            salary_cents_euro_per_month: faker.number.int({
              min: salaryCentsEuroPerMonth - 500,
              max: salaryCentsEuroPerMonth + 500,
            }),
          }
        })
      },
    ),
  )
  .executeTakeFirstOrThrow()

await Promise.all(
  Array.from({ length: PASSENGERS_COUNT / CHUNK_SIZE }).map(async () => {
    await database
      .insertInto("passenger")
      .values(
        Array.from({ length: CHUNK_SIZE }).map(() => {
          return {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName().toUpperCase(),
          }
        }),
      )
      .executeTakeFirstOrThrow()
  }),
)

await database
  .insertInto("customer")
  .values(
    await Promise.all(
      faker.helpers
        .uniqueArray(faker.internet.email, CUSTOMERS_COUNT)
        .map(async (email) => {
          const passwordHashed = await bcrypt.hash(faker.internet.password(), 4)
          return {
            email,
            password: passwordHashed,
          }
        }),
    ),
  )
  .executeTakeFirstOrThrow()

await database.destroy()
