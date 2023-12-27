import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
console.log("POSTGRES_URL:", process.env.POSTGRES_URL);

export default {
  schema: "./src/lib/db/Schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL + "?sslmode=require" || "",
  },
} satisfies Config;
