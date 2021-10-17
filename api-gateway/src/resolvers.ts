
export const resolvers = {
  Query: {
    userSession: async (
      _obj: any,
      _args: any,
      ctx: { userSession: { id: string } }
    ) => ctx.userSession,
  },
};
