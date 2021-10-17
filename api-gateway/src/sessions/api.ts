import got from "got/dist/source";
import { User, UserSession } from "../@types/Users";
import { CONFIG } from "../server";

export const getUser: (userId: string) => Promise<User> = async (
  userId: string
) => {
  const user = await got
    .get(`${CONFIG.USERS_SERVICE_URI}/users/${userId}`)
    .json<User>();
  return user;
};

export const getSession = async (sessionId: string) => {
  const session = await got
    .get(`${CONFIG.USERS_SERVICE_URI}/sessions/${sessionId}`)
    .json<UserSession>();
  console.dir("user session injected", session);
  return session;
};
