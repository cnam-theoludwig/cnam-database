import { database } from "../database.ts"
import {
  cleanAmbiguousUnicodeCharacters,
  datagenEntity,
  faker,
} from "./_utils.ts"

const AVIATION_JOBS = {
  Pilot: {
    count: 248,
    salaryCentsEuroPerMonth: 10_000 * 100,
  },
  Copilot: {
    count: 248,
    salaryCentsEuroPerMonth: 7_500 * 100,
  },
  "Cabin crew": {
    count: 668,
    salaryCentsEuroPerMonth: 2_000 * 100,
  },
  "Aircraft mechanic": {
    count: 244,
    salaryCentsEuroPerMonth: 4_500 * 100,
  },
  "Customer service agent": {
    count: 757,
    salaryCentsEuroPerMonth: 2_000 * 100,
  },
  "Flight operations engineer": {
    count: 156,
    salaryCentsEuroPerMonth: 4_500 * 100,
  },
}

export const PILOTS_IDS: string[] = []
export const COPILOTS_IDS: string[] = []
export const CABIN_CREW_IDS: string[] = []

export const datagenEmployee = async (): Promise<void> => {
  await datagenEntity({
    entity: "employee",
    handler: async () => {
      return [
        database.insertInto("employee").values(
          Object.entries(AVIATION_JOBS).flatMap(
            ([job, { count, salaryCentsEuroPerMonth }]) => {
              return Array.from({ length: count }).map(() => {
                const id = crypto.randomUUID()
                if (job === "Pilot") {
                  PILOTS_IDS.push(id)
                } else if (job === "Copilot") {
                  COPILOTS_IDS.push(id)
                } else if (job === "Cabin crew") {
                  CABIN_CREW_IDS.push(id)
                }
                return {
                  id,
                  first_name: cleanAmbiguousUnicodeCharacters(
                    faker.person.firstName(),
                  ),
                  last_name: cleanAmbiguousUnicodeCharacters(
                    faker.person.lastName().toUpperCase(),
                  ),
                  job: job as keyof typeof AVIATION_JOBS,
                  hire_date: faker.date.past({
                    years: 10,
                  }),
                  salary_cents_euro_per_month: faker.number.int({
                    min: salaryCentsEuroPerMonth - 500,
                    max: salaryCentsEuroPerMonth + 500,
                  }),
                }
              })
            },
          ),
        ),
      ]
    },
  })
}
