import got from "got/dist/source";
import { User } from "../@types/Users";
import { authorization } from "../helpers";
import { CONFIG, Context } from "../server";
// import mercurius from "mercurius";
// const { ErrorWithProps } = mercurius;

export const findAllChat = async (data: { userId: string }, ctx: Context) => {
  await authorization(ctx);
  const response = await got
    .get(`${CONFIG.CHAT_SERVICE_URI}/chat?userId=${data.userId}`)
    .json();
  return response;
};

// export const getChat = async (chatId: { id: string }, ctx: Context) => {
//   await authorization(ctx);
//   const singleChat = await got
//     .get(`${CONFIG.CHAT_SERVICE_URI}/chat/${chatId}`)
//     .json();
//   return singleChat;
// };

export const createChat = async (
  {
    message,
    userId,
  }: {
    message: string;
    userId: string;
  },
  ctx: Context
) => {
  await authorization(ctx);
  const newUser = await got
    .post(`${CONFIG.CHAT_SERVICE_URI}/chat`, {
      json: { message, userId },
    })
    .json<User>();
  return newUser;
};
