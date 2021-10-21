import { Context } from "./server";
import { getSession } from "./users/api";

export const authorization = async (ctx: Context) => {
  if (
    !ctx ||
    !ctx.request ||
    !ctx.request.cookies ||
    !("sessionId" in ctx.request.cookies)
  ) {
    throw Error("Unauthorized");
  }
  const userSession = await getSession(ctx.request.cookies["sessionId"] as string);
  if (!userSession.id) {
    throw Error("Unauthorized");
  }
};
