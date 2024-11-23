import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";

const migrationClient = new Database(process.env.DATABASE_URL || "", {
  fileMustExist: false,
});

migrate(drizzle(migrationClient), {
  migrationsFolder: "./src/drizzle/migrations",
});
migrationClient.close();
