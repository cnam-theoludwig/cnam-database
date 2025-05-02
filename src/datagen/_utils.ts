import { Faker, fr } from "@faker-js/faker"
import type { InsertQueryBuilder, InsertResult } from "kysely"
import fs from "node:fs"
import path from "node:path"
import prettyMilliseconds from "pretty-ms"
import {
  shouldGenerateSQLFiles,
  SQL_FILES_DIRECTORY_INSERTS_PATH,
} from "../configuration.ts"
import type { Database } from "../database.ts"

export const faker = new Faker({
  locale: [fr],
})
faker.seed(123)
faker.setDefaultRefDate("2025-04-29T12:00:00.000Z")

export const CHUNK_SIZE = 1_000

export interface DatagenEntityInput<Table extends keyof Database> {
  handler: () => Promise<
    Array<InsertQueryBuilder<Database, Table, InsertResult>>
  >
  entity: Table
}

export const generatedSQLFiles: string[] = []

export const datagenEntity = async <Table extends keyof Database>(
  input: DatagenEntityInput<Table>,
): Promise<void> => {
  const { handler, entity } = input

  const beforeTimeMs = performance.now()
  console.log(`Data generation of \`${entity}\`...`)

  try {
    const insertQueries = await handler()

    if (shouldGenerateSQLFiles) {
      const name = `insert_${entity}`
      const nameSQL = `${name}.sql`
      generatedSQLFiles.push(nameSQL)
      const sqlFile = path.join(SQL_FILES_DIRECTORY_INSERTS_PATH, nameSQL)

      let lastQuery: string | null = null
      let index = 0
      const sqlQueries = insertQueries
        .map((queryBuilder, indexMap) => {
          const queryCompiled = queryBuilder.compile()
          const prepartedQueryName = index === 0 ? name : `${name}_${index}`

          const parameters = queryCompiled.parameters.map((param) => {
            if (typeof param === "string") {
              return `'${param.replace(/'/g, "''")}'`
            }
            if (typeof param === "boolean") {
              return `'${param ? "t" : "f"}'`
            }
            if (param instanceof Date) {
              return `'${param.toISOString()}'`
            }
            return param
          })

          const sql = queryCompiled.sql
            .replace("insert into", "INSERT INTO")
            .replace("values", "VALUES")
          let query = ""

          if (lastQuery == null || lastQuery !== sql) {
            query = `DEALLOCATE PREPARE ALL;
PREPARE ${prepartedQueryName} AS
  ${sql};
`
            lastQuery = sql
            if (indexMap !== 0) {
              index += 1
            }
          }
          query += `EXECUTE ${prepartedQueryName}(${parameters.join(", ")});`
          return query
        })
        .join("\n")

      await fs.promises.writeFile(sqlFile, sqlQueries + "\n", {
        encoding: "utf-8",
      })
    } else {
      await Promise.all(
        insertQueries.map(async (query) => {
          await query.executeTakeFirstOrThrow()
        }),
      )
    }

    const afterTimeMs = performance.now()
    const elapsedTimeMs = afterTimeMs - beforeTimeMs
    console.log(
      `Data generation of \`${entity}\` done in ${prettyMilliseconds(elapsedTimeMs)}`,
    )
    console.log()
  } catch (error) {
    console.error(`Error while generating data for \`${entity}\`:`, error)
    console.error()
  }
}
