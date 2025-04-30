import prettyMilliseconds from "pretty-ms"
import { Faker, fr } from "@faker-js/faker"

export const faker = new Faker({
  locale: [fr],
})
faker.seed(123)
faker.setDefaultRefDate("2025-04-29T12:00:00.000Z")

export const CHUNK_SIZE = 1_000

export interface DatagenEntityInput {
  handler: (input: { beforeTimeMs: number }) => Promise<void>
  entity: string
}

export const datagenEntity = async (
  input: DatagenEntityInput,
): Promise<void> => {
  const { handler, entity } = input

  const beforeTimeMs = performance.now()
  console.log(`Data generation of \`${entity}\`...`)

  try {
    await handler({ beforeTimeMs })
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
