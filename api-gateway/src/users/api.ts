import got from "got/dist/source";
import { User, UserSession } from "../@types/Users";
import { CONFIG, Context } from "../server";

export const getUser: (userId: string) => Promise<User> = async (
  userId: string
) => {
  const user = await got
    .get(`${CONFIG.USERS_SERVICE_URI}/users/${userId}`)
    .json<User>();
  return user;
};

export const createUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const newUser = await got
    .post(`${CONFIG.USERS_SERVICE_URI}/users`, {
      json: { email, password },
    })
    .json<User>();
  return newUser;
};

export const getSession = async (sessionId: string) => {
  const session = await got
    .get(`${CONFIG.USERS_SERVICE_URI}/sessions/${sessionId}`)
    .json<UserSession>();
  return session;
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
  ctx.reply.setCookie("sessionId", newSession.id);
  return newSession;
};
