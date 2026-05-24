import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  clerkId: text("clerk_id").primaryKey(),
  email: text("email"),
  name: text("name"),
  groupAccess: text("group_access"), // legacy
  paymentStatus: text("payment_status").default("none"), // legacy
  transactionId: text("transaction_id"), // legacy
  pcbStatus: text("pcb_status").default("none"), // 'none', 'pending', 'approved'
  pcbTxId: text("pcb_tx_id"),
  pcmStatus: text("pcm_status").default("none"), // 'none', 'pending', 'approved'
  pcmTxId: text("pcm_tx_id"),
  bioStatus: text("bio_status").default("none"), // 'none', 'pending', 'approved'
  bioTxId: text("bio_tx_id"),
  chemStatus: text("chem_status").default("none"), // 'none', 'pending', 'approved'
  chemTxId: text("chem_tx_id"),
  phyStatus: text("phy_status").default("none"), // 'none', 'pending', 'approved'
  phyTxId: text("phy_tx_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  groupName: text("group_name").notNull(), // 'PCB' or 'PCM'
  mockNumber: integer("mock_number").notNull(), // 1, 2, or 3
  questionText: text("question_text").notNull(),
  optionA: text("option_a").notNull(),
  optionB: text("option_b").notNull(),
  optionC: text("option_c").notNull(),
  optionD: text("option_d").notNull(),
  correctOption: text("correct_option").notNull(), // 'A', 'B', 'C', or 'D'
});

export const attempts = pgTable("attempts", {
  id: serial("id").primaryKey(),
  clerkId: text("clerk_id").notNull(),
  mockNumber: integer("mock_number").notNull(),
  groupName: text("group_name").notNull(),
  answers: jsonb("answers"), // { "question_id": "A", ... }
  score: integer("score"),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

