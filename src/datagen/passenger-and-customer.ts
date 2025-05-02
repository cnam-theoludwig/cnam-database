import bcrypt from "bcryptjs"
import { database } from "../database.ts"
import { CHUNK_SIZE, datagenEntity, faker } from "./_utils.ts"

const PASSENGERS_COUNT = 100_000
const CUSTOMERS_COUNT = 1_000

export const datagenPassenger = async (): Promise<void> => {
  await datagenEntity({
    entity: "passenger",
    handler: async () => {
      return Array.from({ length: PASSENGERS_COUNT / CHUNK_SIZE }).map(() => {
        return database.insertInto("passenger").values(
          Array.from({ length: CHUNK_SIZE }).map(() => {
            return {
              first_name: faker.person.firstName(),
              last_name: faker.person.lastName().toUpperCase(),
            }
          }),
        )
      })
    },
  })
}

export const datagenCustomer = async (): Promise<void> => {
  await datagenEntity({
    entity: "customer",
    handler: async () => {
      return [
        database.insertInto("customer").values(
          await Promise.all(
            faker.helpers
              .uniqueArray(faker.internet.email, CUSTOMERS_COUNT)
              .map(async (email) => {
                const passwordHashed = await bcrypt.hash(
                  faker.internet.password(),
                  4,
                )
                return {
                  email: email.toLowerCase(),
                  password: passwordHashed,
                }
              }),
          ),
        ),
      ]
    },
  })
}
