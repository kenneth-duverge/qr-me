import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getProfiles = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      // throw new Error('Not authenticated');
      return;
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
      social: args.social,
      website: args.website,
      userId: identity.subject,
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phoneNumber: args.phoneNumber,
    });

    return profileId;
  },
});

export const deleteProfile = mutation({
  args: { id: v.id('profiles') },
  handler: async (ctx, arg) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error('Not authenticated');
    }

    await ctx.db.delete(arg.id);
  },
});

export const updateProfile = mutation({
  args: {
    id: v.id('profiles'),
    name: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    website: v.optional(v.string()),
    email: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    social: v.optional(
      v.array(
        v.object({
          handle: v.string(),
          platform: v.string(),
        })
      )
    ),
  },
  handler: async (ctx, { id, ...args }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error('Not authenticated');
    }

    await ctx.db.patch(id, args);
  },
});
