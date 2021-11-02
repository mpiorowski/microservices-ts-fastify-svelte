import { User, UserSession } from "./@types/Users";
import { getUserLoader } from "./services/user.services";

export type Chat = {
  id: string;
  message: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
};

export const loaders = {
  UserSession: {
    async user(queries: { obj: UserSession }[]): Promise<User[]> {
      let users: Promise<User>[] = [];
      queries.forEach(({ obj }: { obj: UserSession }) => {
        const user = getUserLoader(obj.userId);
        users.push(user);
      });
      return Promise.all(users);
    },
  },
  Chat: {
    async user(queries: { obj: Chat }[]): Promise<User[]> {
      let users: Promise<User>[] = [];
      queries.forEach(({ obj }: { obj: Chat }) => {
        const user = getUserLoader(obj.userId);
        users.push(user);
      });
      return Promise.all(users);
    },
  },
};
