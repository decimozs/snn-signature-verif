import { boolean, pgTable, text, doublePrecision } from "drizzle-orm/pg-core";
import { baseSchema } from "@/utils";
import { signatures } from "./signatures";
import { relations } from "drizzle-orm";

export const verifications = pgTable("verifications", {
  ...baseSchema,
  signatureId: text("signature_id").references(() => signatures.id, {
    onDelete: "set null",
  }),
  queryImageUrl: text("query_image_url").notNull(),
  isAuthentic: boolean("is_authentic").notNull(),
  similarityScore: doublePrecision("similarity_score").notNull(),
});

export const verificationsRelations = relations(verifications, ({ one }) => ({
  signature: one(signatures, {
    fields: [verifications.signatureId],
    references: [signatures.id],
  }),
}));
