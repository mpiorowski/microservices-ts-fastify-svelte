import { User, UserSession } from "./@types/Users";
import { getUser } from "./sessions/api";

export const loaders = {
  UserSession: {
    async user(queries: { obj: UserSession }[]): Promise<User[]> {
      let users = [] as Promise<User>[];
      queries.forEach(({ obj }: { obj: UserSession }) => {
        if (obj.id) {
          const user = getUser(obj.userId);
          users.push(user);
        }
      });
      return Promise.all(users);
    },
  },
};
