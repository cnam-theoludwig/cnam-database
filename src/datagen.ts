import { database } from "./database.ts"

database
  .insertInto("passenger")
  .values([
    {
      first_name: "John",
      last_name: "Doe",
    },
  ])
  .execute()

// await database.destroy()
