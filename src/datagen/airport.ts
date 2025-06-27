import fs from "node:fs"
import ky from "ky"
import {
  AIRPORT_DB_API_TOKEN,
  AIRPORTS_DB_FILE,
  DATA_FILES_DIRECTORY_PATH,
  shouldUseAirportDB,
} from "../configuration.ts"
import { database } from "../database.ts"
import { datagenEntity } from "./_utils.ts"

interface Airport {
  ident: string
  name: string
  latitude_deg: number
  longitude_deg: number
  continent: string
  iso_country: string
  municipality: string
  gps_code: string
  iata_code: string
  icao_code: string
  local_code: string
}

export const AIRPORTS_ICAO_CODES_TO_FETCH = [
  "LFPG",
  "LFPO",
  "LFMN",
  "LFST",
  "LFKJ",
  "KATL",
  "ZBAA",
  "KLAX",
  "LEMD",
  "RJTT",
  "LEBL",
  "LEMG",
  "EDDM",
  "GCTS",
  "OMDB",
  "EDDF",
  "EGLL",
  "KMIA",
  "LIRF",
  "MMMX",
  "CYYZ",
  "LFSB",
]

export const AIRPORTS_IATA_CODES: string[] = []

export const datagenAirport = async (): Promise<void> => {
  await datagenEntity({
    entity: "airport",
    handler: async () => {
      let airports: Airport[] = []

      if (shouldUseAirportDB) {
        airports = await Promise.all(
          AIRPORTS_ICAO_CODES_TO_FETCH.map(async (icaoCode) => {
            const airportsURL = new URL(
              `https://airportdb.io/api/v1/airport/${icaoCode}`,
            )
            airportsURL.searchParams.set("apiToken", AIRPORT_DB_API_TOKEN)
            const json = await ky.get(airportsURL).json()
            return json as Airport
          }),
        )
        await fs.promises.mkdir(DATA_FILES_DIRECTORY_PATH, { recursive: true })
        await fs.promises.writeFile(
          AIRPORTS_DB_FILE,
          JSON.stringify(airports, null, 2),
          {
            encoding: "utf-8",
          },
        )
      } else {
        const airportsFile = await fs.promises.readFile(AIRPORTS_DB_FILE, {
          encoding: "utf-8",
        })
        airports = JSON.parse(airportsFile) as Airport[]
      }

      return [
        database.insertInto("airport").values(
          airports.map((airport) => {
            AIRPORTS_IATA_CODES.push(airport.iata_code)
            return {
              code_iata: airport.iata_code,
              code_icao: airport.icao_code,
              name: airport.name,
              country: airport.iso_country,
              city: airport.municipality,
              latitude: airport.latitude_deg,
              longitude: airport.longitude_deg,
            }
          }),
        ),
      ]
    },
  })
}
