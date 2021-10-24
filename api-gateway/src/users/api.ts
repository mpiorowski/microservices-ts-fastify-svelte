import got from "got/dist/source";
import { User, UserSession } from "../@types/Users";
import { authorization } from "../helpers";
import { CONFIG, Context } from "../server";

export const getUserSessionFromContext = async (ctx: Context) => {
  const response = await authorization(ctx);
  return response;
};

export const getSession = async (sessionId: string) => {
  const session = await got
    .get(`${CONFIG.USERS_SERVICE_URI}/sessions/${sessionId}`)
    .json<UserSession>();
  return session;
};

export const getUserLoader: (userId: string) => Promise<User> = async (
  userId: string
) => {
  const user = await got
    .get(`${CONFIG.USERS_SERVICE_URI}/users/${userId}`)
    .json<User>();
  return user;
};

export const createUser = async (
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  },
  ctx: Context
) => {
  await authorization(ctx);
  const newUser = await got
    .post(`${CONFIG.USERS_SERVICE_URI}/users`, {
      json: { email, password },
    })
    .json<User>();
  return newUser;
};

export const createSession = async (
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  },
  ctx: Context
) => {
  const newSession = await got
    .post(`${CONFIG.USERS_SERVICE_URI}/sessions`, {
      json: { email, password },
    })
    .json<UserSession>();
  ctx.reply.setCookie("sessionId", newSession.id, {
    // domain: 'http://localhost:5000',
    path: "/",
    secure: process.env["NODE_ENV"] === "production" ? true : false, // send cookie over HTTPS only
    httpOnly: true,
    sameSite: true,
    expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
  });
  return newSession;
};
