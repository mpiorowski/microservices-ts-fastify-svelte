export type User = {
  id: string;
  email: string;
  password: string;
};
export type Chat = {
  id: string;
  message: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
};
