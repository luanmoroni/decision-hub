import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const dashboardState = sqliteTable("dashboard_state", {
  id: text("id").primaryKey(),
  data: text("data").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
