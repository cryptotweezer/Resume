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
  verbose: true,
} satisfies Config
