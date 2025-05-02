import { database } from "../database.ts"
import { datagenEntity, faker } from "./_utils.ts"

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
        ),
      ]
    },
  })
}
