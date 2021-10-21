import { Context } from "./server";
import { createSession, createUser } from "./users/api";

export const resolvers = {
  Query: {
    userSession: async (
      _obj: any,
      _args: any,
      ctx: Context
    ) => ctx.userSession,
  },
  Mutation: {
    createUserSession: async (
      _obj: any,
      args: { email: string; password: string },
      ctx: Context
    ) => createSession(args, ctx),

    createUser: async (
      _obj: any,
      args: { email: string; password: string },
      ctx: Context
    ) => createUser(args, ctx),
  },
};
