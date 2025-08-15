import { relations } from "drizzle-orm/relations";
import { casts, links, reactions, profiles, verifications } from "./schema";

export const castsRelations = relations(casts, ({ many }) => ({
  reactions: many(reactions),
}));

export const reactionsRelations = relations(reactions, ({ one }) => ({
  targetCast: one(casts, {
    fields: [reactions.targetCastFid, reactions.targetCastHash],
    references: [casts.fid, casts.hash],
  }),
}));

export const profilesRelations = relations(profiles, ({ many }) => ({
  casts: many(casts, {
    relationName: "profile_casts",
  }),
  links: many(links, {
    relationName: "profile_links",
  }),
  reactions: many(reactions, {
    relationName: "profile_reactions",
  }),
  verifications: many(verifications, {
    relationName: "profile_verifications",
  }),
}));

export const linksRelations = relations(links, ({ one }) => ({
  profile: one(profiles, {
    fields: [links.fid],
    references: [profiles.fid],
    relationName: "profile_links",
  }),
  targetProfile: one(profiles, {
    fields: [links.targetFid],
    references: [profiles.fid],
    relationName: "target_profile_links",
  }),
}));

export const verificationsRelations = relations(verifications, ({ one }) => ({
  profile: one(profiles, {
    fields: [verifications.fid],
    references: [profiles.fid],
    relationName: "profile_verifications",
  }),
}));
