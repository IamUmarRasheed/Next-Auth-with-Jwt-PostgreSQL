
import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  uniqueIndex,
  boolean,
  date,
  
} from "drizzle-orm/pg-core";
import { InferInsertModel,  InferSelectModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  isadmin: boolean("isadmin").default(false),
  isverify: boolean("isadmin").default(false),
  createdat:timestamp('createdat').defaultNow(),
  updatedat:timestamp('updatedat').defaultNow()
});
export  type User =InferSelectModel<typeof users>
export type NewUser=InferInsertModel<typeof users> 
