import { logout } from "./helpers";
import { Context } from "./server";
import {
  createSession,
  createUser,
  getUserSessionFromContext,
} from "./users/api";

export const resolvers = {
  Query: {
    logout: async (_obj: any, _args: any, ctx: Context) => logout(ctx),
    userSession: async (_obj: any, _args: any, ctx: Context) =>
      getUserSessionFromContext(ctx),
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
