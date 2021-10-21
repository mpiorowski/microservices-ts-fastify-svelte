import { User, UserSession } from "./@types/Users";
import { getUserLoader } from "./users/api";

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
};
