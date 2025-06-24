import fs from "node:fs"
import path from "node:path"
import {
  shouldGenerateSQLFiles,
  SQL_FILES_DIRECTORY_INSERTS_PATH,
} from "../configuration.ts"
import { database } from "../database.ts"
import { generatedSQLFiles } from "./_utils.ts"
import { datagenAirplane, datagenSeat } from "./airplane-and-seat.ts"
import { datagenAirport } from "./airport.ts"
import { datagenEmployee } from "./employee.ts"
import { datagenCustomer, datagenPassenger } from "./passenger-and-customer.ts"
import { datagenFlights } from "./flights.ts"

await datagenAirplane()
await datagenSeat()
await datagenEmployee()
await datagenPassenger()
await datagenCustomer()
await datagenAirport()
await datagenFlights()

await database.destroy()

if (shouldGenerateSQLFiles) {
  const sqlFile = path.join(SQL_FILES_DIRECTORY_INSERTS_PATH, "_inserts.sql")
  const sqlQueries: string[] = []
  for (const filename of generatedSQLFiles) {
    sqlQueries.push(`\\i /sql/inserts/${filename}`)
  }
  const sqlFileContent = sqlQueries.join("\n") + "\n"
  await fs.promises.writeFile(sqlFile, sqlFileContent, {
    encoding: "utf-8",
  })
}
