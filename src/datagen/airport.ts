import { database } from "../database.ts"
import { datagenEntity } from "./_utils.ts"

export const datagenAirport = async (): Promise<void> => {
  await datagenEntity({
    entity: "airport",
    handler: async () => {
      // return [database.insertInto("airport").values([])]
      return []
    },
  })
}
