import { database } from "../database.ts"
import { datagenEntity, faker } from "./_utils.ts"

const AIRPLANES = {
  Airbus: {
    A319: {
      count: 9,
      fuelCapacityLiter: 30_190,
      priceCentsEuro: 89_000_000 * 100,
      minSeatCount: 150,
      maxSeatCount: 180,
      registrationNumbers: [] as string[],
    },
    A320: {
      count: 60,
      fuelCapacityLiter: 23_430,
      priceCentsEuro: 25_000_000 * 100,
      minSeatCount: 150,
      maxSeatCount: 180,
      registrationNumbers: [] as string[],
    },
    A321: {
      count: 25,
      fuelCapacityLiter: 30_030,
      priceCentsEuro: 150_000_000 * 100,
      minSeatCount: 180,
      maxSeatCount: 240,
      registrationNumbers: [] as string[],
    },
    A350: {
      count: 20,
      fuelCapacityLiter: 317_000_000,
      priceCentsEuro: 350_000_000 * 100,
      minSeatCount: 300,
      maxSeatCount: 440,
      registrationNumbers: [] as string[],
    },
  },
  Boeing: {
    B777: {
      count: 7,
      fuelCapacityLiter: 181_283,
      priceCentsEuro: 320_000_000 * 100,
      minSeatCount: 300,
      maxSeatCount: 550,
      registrationNumbers: [] as string[],
    },
    B787: {
      count: 14,
      fuelCapacityLiter: 126_917,
      priceCentsEuro: 248_000_000 * 100,
      minSeatCount: 240,
      maxSeatCount: 330,
      registrationNumbers: [] as string[],
    },
  },
}
const AIRPLANES_COUNT = Object.values(AIRPLANES).reduce((current, models) => {
  return (
    current +
    Object.values(models).reduce((current, { count }) => current + count, 0)
  )
}, 0)

export const datagenAirplane = async (): Promise<void> => {
  await datagenEntity({
    entity: "airplane",
    handler: async () => {
      const registrationNumbers = faker.helpers.uniqueArray(() => {
        return faker.string.alphanumeric(6).toUpperCase()
      }, AIRPLANES_COUNT)

      return [
        database.insertInto("airplane").values(
          Object.entries(AIRPLANES).flatMap(([brand, models]) => {
            return Object.entries(models).flatMap(([model, modelInfo]) => {
              return Array.from({ length: modelInfo.count }).map(() => {
                const registrationNumber = registrationNumbers.pop() as string
                modelInfo.registrationNumbers.push(registrationNumber)
                return {
                  registration_number: registrationNumber,
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
        ),
      ]
    },
  })
}

export const datagenSeat = async (): Promise<void> => {
  await datagenEntity({
    entity: "seat",
    handler: async () => {
      return [
        database.insertInto("seat").values(
          Object.entries(AIRPLANES).flatMap(([_brand, models]) => {
            return Object.entries(models).flatMap(([_model, modelInfo]) => {
              return modelInfo.registrationNumbers.flatMap(
                (registrationNumber) => {
                  const seatCount = faker.number.int({
                    min: modelInfo.minSeatCount,
                    max: modelInfo.maxSeatCount,
                  })

                  const seats = faker.helpers.uniqueArray(
                    faker.airline.seat,
                    seatCount,
                  )

                  return seats.map((seat) => {
                    return {
                      airplane_registration_number: registrationNumber,
                      number: seat,
                    }
                  })
                },
              )
            })
          }),
        ),
      ]
    },
  })
}
