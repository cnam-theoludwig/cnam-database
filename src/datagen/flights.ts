import { database } from "../database.ts"
import { CHUNK_SIZE, datagenEntity, faker } from "./_utils.ts"

const FLIGHTS_COUNT = 1_000

export const datagenFlights = async (): Promise<void> => {
  await datagenEntity({
    entity: "flight",
    handler: async () => {
      const airports = await database
        .selectFrom("airport")
        .select("code_iata")
        .execute()

      const airplanes = await database
        .selectFrom("airplane")
        .select(["registration_number", "fuel_capacity_liter"])
        .execute()

      const airportCodes = airports.map((a) => a.code_iata)

      const flightNumbers = faker.helpers.uniqueArray(() => {
        return faker.airline.flightNumber({ addLeadingZeros: true })
      }, FLIGHTS_COUNT)

      return Array.from({ length: FLIGHTS_COUNT / CHUNK_SIZE }).map(() => {
        return database.insertInto("flight").values(
          Array.from({ length: CHUNK_SIZE }).map(() => {
            const airplane = faker.helpers.arrayElement(airplanes)
            const departureAirport = faker.helpers.arrayElement(airportCodes)
            let arrivalAirport = faker.helpers.arrayElement(airportCodes)

            while (arrivalAirport === departureAirport) {
              arrivalAirport = faker.helpers.arrayElement(airportCodes)
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

            return {
              number: flightNumbers.pop() as string,
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
}
