import type { Config } from "drizzle-kit"
import "dotenv/config"

// Use direct connection URL for migrations (not the pooler)
const connectionString = process.env.DATABASE_URL_DIRECT || process.env.DATABASE_URL!;

export default {
  schema: "./lib/db.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
  // The database is shared with the unrelated `pis` project; without this filter
  // drizzle-kit would treat its tables as drift and generate DROP statements.
  schemaFilter: ["resume"],
  verbose: true,
} satisfies Config
