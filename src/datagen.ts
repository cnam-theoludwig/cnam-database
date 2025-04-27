import { database } from "./database.ts"
import { Faker, fr } from "@faker-js/faker"

export const faker = new Faker({
  locale: [fr],
})
faker.seed(123)
faker.setDefaultRefDate("2024-09-15T12:00:00.000Z")

const AVIATION_JOBS = [
  "Pilot",
  "Copilot",
  "Flight coordinator",
  "Flight attendant",
  "Cabin manager",
  "Aircraft mechanic",
  "Air traffic controller",
] as const
// const AIRPLANE_BRANDS = ["Airbus", "Boeing"]
// const AIRPLANE_MODELS = [
//   "A320",
//   "A330",
//   "A350",
//   "B737",
//   "B747",
//   "B777",
//   "B787",
//   "A380",
//   "A220",
//   "A310",
//   "A300",
//   "B767",
//   "B757",
// ] as const

for (let i = 0; i < 200; i++) {
  await database
    .insertInto("passenger")
    .values(
      Array.from({ length: 1000 }).map(() => {
        return {
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
        }
      }),
    )
    .execute()
}

await database
  .insertInto("customer")
  .values(
    faker.helpers.uniqueArray(faker.internet.email, 1000).map((email) => {
      return {
        email,
        password: faker.internet.password(),
      }
    }),
  )
  .execute()

await database
  .insertInto("employee")
  .values(
    Array.from({ length: 1000 }).map(() => {
      const job = AVIATION_JOBS[
        Math.floor(Math.random() * AVIATION_JOBS.length)
      ] as (typeof AVIATION_JOBS)[number]
      let salary = faker.number.int({ min: 1800 * 100, max: 3200 * 100 })
      if (job === "Pilot") {
        salary = faker.number.int({ min: 4000 * 100, max: 7500 * 100 })
      } else if (job === "Copilot") {
        salary = faker.number.int({ min: 3000 * 100, max: 5000 * 100 })
      }
      return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        job,
        hire_date: faker.date.past(),
        salary_cents_euro: salary,
      }
    }),
  )
  .execute()

await database.insertInto("airplane").values(Array.from({ length: 224 }))

await database.destroy()
