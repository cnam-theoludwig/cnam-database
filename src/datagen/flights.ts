import { database } from "../database.ts"
import { CHUNK_SIZE, datagenEntity, faker } from "./_utils.ts"
import { AIRPLANES_DATA } from "./airplane-and-seat.ts"
import { AIRPORTS_IATA_CODES } from "./airport.ts"
import { CABIN_CREW_IDS, COPILOTS_IDS, PILOTS_IDS } from "./employee.ts"

const FLIGHTS_COUNT = 2_000

export const datagenFlights = async (): Promise<void> => {
  const flightsNumber: string[] = []

  await datagenEntity({
    entity: "flight",
    handler: async () => {
      const flightNumbers = faker.helpers.uniqueArray(() => {
        return faker.airline.flightNumber({ addLeadingZeros: true })
      }, FLIGHTS_COUNT)

      return Array.from({ length: FLIGHTS_COUNT / CHUNK_SIZE }).map(() => {
        return database.insertInto("flight").values(
          Array.from({ length: CHUNK_SIZE }).map(() => {
            const airplane = faker.helpers.arrayElement(AIRPLANES_DATA)
            const departureAirport =
              faker.helpers.arrayElement(AIRPORTS_IATA_CODES)
            let arrivalAirport = faker.helpers.arrayElement(AIRPORTS_IATA_CODES)

            while (arrivalAirport === departureAirport) {
              arrivalAirport = faker.helpers.arrayElement(AIRPORTS_IATA_CODES)
            }

            const departureDate = faker.date.between({
              from: new Date("2025-01-01"),
              to: new Date("2025-12-31"),
            })

            const flightDurationHours = faker.number.float({ min: 1, max: 12 })
            const arrivalDate = new Date(
              departureDate.getTime() + flightDurationHours * 60 * 60 * 1000,
            )

            const hasEffectiveTimes = faker.datatype.boolean({
              probability: 0.7,
            })

            let departureDateEffective = null
            let arrivalDateEffective = null

            if (!hasEffectiveTimes) {
              const departureDelayMinutes = faker.number.int({
                min: -30,
                max: 120,
              })
              const arrivalDelayMinutes = faker.number.int({
                min: -30,
                max: 120,
              })

              departureDateEffective = new Date(
                departureDate.getTime() + departureDelayMinutes * 60 * 1000,
              )
              arrivalDateEffective = new Date(
                arrivalDate.getTime() + arrivalDelayMinutes * 60 * 1000,
              )
            }

            const fuelConsumption = Math.floor(
              (flightDurationHours / 10) *
                airplane.fuel_capacity_liter *
                faker.number.float({ min: 0.3, max: 0.8 }),
            )

            const flightNumber = flightNumbers.pop() as string
            flightsNumber.push(flightNumber)

            return {
              number: flightNumber,
              departure_date: departureDate,
              arrival_date: arrivalDate,
              departure_date_effective: departureDateEffective,
              arrival_date_effective: arrivalDateEffective,
              total_fuel_consumption_liter: fuelConsumption,
              departure_airport: departureAirport,
              arrival_airport: arrivalAirport,
              airplane_number: airplane.registration_number,
            }
          }),
        )
      })
    },
  })

  await datagenEntity({
    entity: "flight_employee",
    handler: async () => {
      return [
        database.insertInto("flight_employee").values(
          flightsNumber.flatMap((flightNumber) => {
            const pilot = faker.helpers.arrayElement(PILOTS_IDS)
            const copilot = faker.helpers.arrayElement(COPILOTS_IDS)
            const cabinCrew = faker.helpers.arrayElements(CABIN_CREW_IDS, {
              min: 2,
              max: 5,
            })
            return [
              {
                flight_number: flightNumber,
                employee_id: pilot,
              },
              {
                flight_number: flightNumber,
                employee_id: copilot,
              },
              ...cabinCrew.map((crewMember) => {
                return {
                  flight_number: flightNumber,
                  employee_id: crewMember,
                }
              }),
            ]
          }),
        ),
      ]
    },
  })
}
