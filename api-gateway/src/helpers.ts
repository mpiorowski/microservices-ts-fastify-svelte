import { Context } from "./server";
import { getSession } from "./services/user.services";

export const authorization = async (ctx: Context) => {
  if (
    !ctx ||
    !ctx.request ||
    !ctx.request.cookies ||
    !("sessionId" in ctx.request.cookies)
  ) {
    throw Error("Unauthorized");
  }
  const userSession = await getSession(
    ctx.request.cookies["sessionId"] as string
  );
  if (!userSession.id) {
    throw Error("Unauthorized");
  }
  return userSession;
};

export const logout = async (ctx: Context) => {
  ctx.reply.setCookie("sessionId", "", {
    // domain: 'http://localhost:5000',
    path: "/",
    secure: process.env["NODE_ENV"] === "production" ? true : false, // send cookie over HTTPS only
    httpOnly: true,
    sameSite: true,
    expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
  });
  ctx.request.cookies["sessionId"] = "";
  return "";
};
