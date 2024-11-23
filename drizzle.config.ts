import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
  verbose:
    process.env.NODE_ENV === "development" ||
    process.env.DRIZZLE_VERBOSE === "true",
  strict: true,
});
