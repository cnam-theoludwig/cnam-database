import fs from "node:fs"
import path from "node:path"
import { parseArgs } from "node:util"

export const DATABASE_USER = process.env["DATABASE_USER"] ?? "pilote"
export const DATABASE_PASSWORD = process.env["DATABASE_PASSWORD"] ?? "password"
export const DATABASE_NAME = process.env["DATABASE_NAME"] ?? "airlines"
export const DATABASE_HOST = process.env["DATABASE_HOST"] ?? "localhost"
export const DATABASE_PORT = Number.parseInt(
  process.env["DATABASE_PORT"] ?? "5432",
  10,
)
export const DATABASE_DEBUG = process.env["DATABASE_DEBUG"] === "true"

export const AIRPORT_DB_API_TOKEN = process.env["AIRPORT_DB_API_TOKEN"] ?? ""

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    sql: {
      type: "boolean",
      default: false,
    },
    airportdb: {
      type: "boolean",
      default: false,
    },
  },
})

export const shouldGenerateSQLFiles = values.sql
export const SQL_FILES_DIRECTORY_PATH = path.join(process.cwd(), "sql")
export const SQL_FILES_DIRECTORY_INSERTS_PATH = path.join(
  process.cwd(),
  "sql",
  "inserts",
)
if (shouldGenerateSQLFiles) {
  await fs.promises.rm(SQL_FILES_DIRECTORY_INSERTS_PATH, {
    recursive: true,
    force: true,
  })
  await fs.promises.mkdir(SQL_FILES_DIRECTORY_INSERTS_PATH, {
    recursive: true,
  })
}

export const shouldUseAirportDB = values.airportdb
export const DATA_FILES_DIRECTORY_PATH = path.join(
  process.cwd(),
  "src",
  "datagen",
  "data",
)
export const AIRPORTS_DB_FILE = path.join(
  DATA_FILES_DIRECTORY_PATH,
  "airports.json",
)
