import got from "got/dist/source";
import mercurius from "mercurius";
import { User, UserSession } from "../@types/Users";
import { authorization } from "../helpers";
import { CONFIG, Context } from "../server";
const { ErrorWithProps } = mercurius;

export const getSession = async (sessionId: string) => {
  const session = await got
    .get(`${CONFIG.USERS_SERVICE_URI}/sessions/${sessionId}`)
    .json<UserSession>();
  return session;
};

export const findAllUsers = async (ctx: Context) => {
  await authorization(ctx);
  const users = await got
    .get(`${CONFIG.USERS_SERVICE_URI}/users`)
    .json<User[]>();
  return users;
};

export const findAllUsersLoader = async () => {
  const users = await got
    .get(`${CONFIG.USERS_SERVICE_URI}/users`)
    .json<User[]>();
  return users;
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
  try {
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
  } catch (error) {
    const err = error as { response: { body: string } };
    throw new ErrorWithProps(
      err.response.body,
      {
        code: "AUTH_INVALID",
        timestamp: Math.round(new Date().getTime() / 1000),
      },
      401
    );
  }
};
