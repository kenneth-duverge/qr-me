import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  profiles: defineTable({
    _id: v.id('profiles'),
    name: v.string(),
    website: v.optional(v.string()),
    firstName: v.string(),
    lastName: v.optional(v.string()),
    email: v.optional(v.string()),
    phoneNumber: v.string(),
    social: v.optional(
      v.array(
        v.object({
          platform: v.string(),
          handle: v.string(),
        })
      )
    ),
    userId: v.string(),
    _creationTime: v.number(),
    modifiedTime: v.number(),
  }),
});
