import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { title } from "process";

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

export const UserTable = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(nanoid),
  name: text("name", { length: 255 }).notNull(),
  email: text("email", { length: 255 }).notNull().unique(),
  salt: text("salt", { length: 255 }).notNull(),
  password: text("password", { length: 255 }).notNull(),
  role: text("userRole").notNull().default(userRole.BASIC),
  // email_verified: integer("email_verified", { mode: "boolean" }).default(false),
  created_at: text("created_at").$defaultFn(isoDate).notNull(),
  updated_at: text("updated_at").$onUpdateFn(isoDate).notNull(),
  dummy_column: text("dummy_column").default("dummy").notNull(),
});

export type InsertUser = InferInsertModel<typeof UserTable>;
export type SelectUser = InferSelectModel<typeof UserTable>;

//-------------------------------------------------------------------

type ImageObject = {
  src: string;
  alt: string;
  blurhash: string;
};

type HomepageSectionContent = {
  title?: string;
  subtitle?: string;
  text?: string;
  image?: ImageObject;
};

export const HomepageSectionsTable = sqliteTable("homepage_sections", {
  id: text("id").primaryKey(),
  content: text("content", { mode: "json" }).$type<HomepageSectionContent>(),
  created_at: text("created_at").$defaultFn(isoDate).notNull(),
  updated_at: text("updated_at").$onUpdateFn(isoDate).notNull(),
});

export type InsertHomepageSection = InferInsertModel<
  typeof HomepageSectionsTable
>;
export type SelectHomepageSection = InferSelectModel<
  typeof HomepageSectionsTable
>;
