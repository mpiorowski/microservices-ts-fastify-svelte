export type User = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserSession = {
  id: string;
  userId: string;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
