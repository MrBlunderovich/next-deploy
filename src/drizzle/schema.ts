import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

function isoDate() {
  return new Date().toISOString();
}

export const TaskTable = sqliteTable("tasks", {
  id: text("id").primaryKey().$defaultFn(nanoid).notNull(),
  user_id: text("user_id").notNull(),
  description: text("description", { length: 255 }).notNull(),
  is_completed: integer("is_completed", { mode: "boolean" })
    .default(false)
    .notNull(),
  created_at: text("created_at").$defaultFn(isoDate).notNull(),
  updated_at: text("updated_at").$onUpdateFn(isoDate).notNull(),
});

export type InsertTask = InferInsertModel<typeof TaskTable>;
export type SelectTask = InferSelectModel<typeof TaskTable>;

//-------------------------------------------------------------------

export enum userRole {
  BASIC = "BASIC",
  ADMIN = "ADMIN",
}

const USER_ID_LENGTH = 30;

export const UserTable = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid(USER_ID_LENGTH)),
  name: text("name", { length: 255 }).notNull(),
  email: text("email", { length: 255 }).notNull().unique(),
  salt: text("salt", { length: 255 }).notNull(),
  password: text("password", { length: 255 }).notNull(),
  role: text("userRole").notNull().default(userRole.BASIC),
  email_verified: integer("email_verified", { mode: "boolean" }).default(false),
  created_at: text("created_at").$defaultFn(isoDate).notNull(),
  updated_at: text("updated_at").$onUpdateFn(isoDate).notNull(),
});

export type InsertUser = InferInsertModel<typeof UserTable>;
export type SelectUser = InferSelectModel<typeof UserTable>;
