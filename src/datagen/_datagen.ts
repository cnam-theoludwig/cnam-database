import { database } from "../database.ts"
import { datagenAirplane } from "./airplane.ts"
import { datagenAirport } from "./airport.ts"
import { datagenEmployee } from "./employee.ts"
import { datagenCustomer, datagenPassenger } from "./passenger-and-customer.ts"

await datagenAirplane()
await datagenEmployee()
await datagenPassenger()
await datagenCustomer()
await datagenAirport()

await database.destroy()
