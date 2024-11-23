"use server";

// import "server-only";
import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";

export async function requestMigration(formData: FormData) {
  const correctPassphrase = process.env.MIGRATION_PASSPHRASE;
  if (!correctPassphrase) {
    console.error("MIGRATION_PASSPHRASE is not set");
    return;
  }

  const passphrase = formData.get("passphrase") as string;
  if (passphrase !== correctPassphrase) {
    console.error("Incorrect passphrase");
    return;
  }

  console.log("Attempting migration.......................");

  attemptMigration();
}

function attemptMigration() {
  const migrationClient = new Database(process.env.DATABASE_URL || "", {
    fileMustExist: false,
  });

  migrate(drizzle(migrationClient), {
    migrationsFolder: "./src/drizzle/migrations",
  });
  migrationClient.close();
}

attemptMigration();
