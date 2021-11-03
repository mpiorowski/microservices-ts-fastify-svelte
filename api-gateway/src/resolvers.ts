import { authorization, logout } from "./helpers";
import { Context } from "./server";
import { createChat, findAllChat } from "./services/chat.services";
import {
  createSession,
  createUser,
  findAllUsers
} from "./services/user.services";

export const resolvers = {
  Query: {
    logout: async (_obj: any, _args: any, ctx: Context) => logout(ctx),
    userSession: async (_obj: any, _args: any, ctx: Context) =>
      await authorization(ctx),
    chat: async (_obj: any, args: { userId: string }, ctx: Context) =>
      findAllChat(args, ctx),
    users: async (_obj: any, _args: any, ctx: Context) => findAllUsers(ctx),
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

    createChat: async (
      _obj: any,
      args: { message: string; userId: string },
      ctx: Context
    ) => createChat(args, ctx),
  },
};
