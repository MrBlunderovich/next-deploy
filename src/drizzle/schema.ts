import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export type MetaImage = {
  src: string;
  alt: string;
  blurhash: string;
};

export const baseColumns = {
  id: text("id").primaryKey().$defaultFn(nanoid),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updated_at: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => sql`(unixepoch())`),
};

export const baseSectionColumns = {
  ...baseColumns,
  section_name: text("section_name").notNull().unique(),
};

export const ImageTable = sqliteTable("images", {
  ...baseColumns,
  belongs_to: text("belongs_to").notNull(),
  src: text("src", { length: 255 }).notNull(),
  alt: text("alt", { length: 255 }).notNull(),
  blurhash: text("blurhash", { length: 255 }).notNull(),
});

//-------------------------------------------------------------------
//-------------------------------------------------------------------

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

export type HomepageSectionContent = {
  title?: string;
  subtitle?: string;
  text?: string;
  image?: MetaImage;
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

//-------------------------------------------------------------------

export const BasicSectionsTable = sqliteTable("basic_sections", {
  id: text("id").primaryKey().$defaultFn(nanoid),
  section_name: text("section_name").notNull().unique(),
  title: text("title", { length: 255 }),
  description: text("description"),
  image: text("image", { mode: "json" }).$type<MetaImage>(),
  created_at: text("created_at").$defaultFn(isoDate).notNull(),
  updated_at: text("updated_at").$onUpdateFn(isoDate).notNull(),
});

export type InsertBasicSection = InferInsertModel<typeof BasicSectionsTable>;
export type SelectBasicSection = InferSelectModel<typeof BasicSectionsTable>;

//-------------------------------------------------------------------

export const GalleryTable = sqliteTable("gallery", {
  ...baseSectionColumns,
  title: text("title", { length: 255 }).notNull(),
});

export type InsertGallery = InferInsertModel<typeof GalleryTable>;
export type SelectGallery = InferSelectModel<typeof GalleryTable>;

//-------------------------------------------------------------------

export const ImagesTable = sqliteTable("images", {
  ...baseColumns,
  section_id: text("section_id").notNull(),
});
