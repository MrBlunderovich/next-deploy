import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

function isoDate() {
  return new Date().toISOString();
}

export const TaskTable = sqliteTable("tasks", {
  id: text("id").primaryKey().$defaultFn(nanoid).notNull(),
  description: text("description", { length: 255 }).notNull(),
  is_completed: integer("is_completed", { mode: "boolean" })
    .default(false)
    .notNull(),
  created_at: text("created_at").$defaultFn(isoDate).notNull(),
  updated_at: text("updated_at").$onUpdateFn(isoDate).notNull(),
  test4: text("test4"),
});

export type InsertTask = InferInsertModel<typeof TaskTable>;
export type SelectTask = InferSelectModel<typeof TaskTable>;
