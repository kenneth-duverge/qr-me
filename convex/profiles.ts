import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getProfiles = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error('Not authenticated');
    }

    const data = await ctx.db
      .query('profiles')
      .filter((q) => q.eq(q.field('userId'), identity.subject))
      .order('desc')
      .take(10);

    return data;
  },
});

export const createProfile = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error('Not authenticated');
    }

    const profileId = await ctx.db.insert('profiles', {
      modifiedTime: Date.now(),
      name: args.name,
      social: [{ platform: '', handle: '' }],
      website: args.website,
      userId: identity.subject,
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phoneNumber: args.phoneNumber,
    });

    console.log(profileId);

    return profileId;
  },
});
