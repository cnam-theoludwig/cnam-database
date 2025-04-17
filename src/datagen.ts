import { database } from "./database.ts"
import { Faker, fr } from "@faker-js/faker"

export const faker = new Faker({
  locale: [fr],
})
faker.seed(123)
faker.setDefaultRefDate("2024-09-15T12:00:00.000Z")

database
  .insertInto("passenger")
  .values([
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
    }, 
  ])
  .execute()

await database.destroy()
