export const DATABASE_USER = process.env["DATABASE_USER"] ?? "pilote"
export const DATABASE_PASSWORD = process.env["DATABASE_PASSWORD"] ?? "password"
export const DATABASE_NAME = process.env["DATABASE_NAME"] ?? "airlines"
export const DATABASE_HOST = process.env["DATABASE_HOST"] ?? "localhost"
export const DATABASE_PORT = Number.parseInt(
  process.env["DATABASE_PORT"] ?? "5432",
  10,
)
export const DATABASE_DEBUG = process.env["DATABASE_DEBUG"] === "true"
