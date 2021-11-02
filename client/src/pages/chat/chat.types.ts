import type { User } from "../_auth/auth.types";

export type Chat = {
	id: string;
	message: string;
	userId: string;
	user: User;
	createdAt: Date;
	updatedAt: Date;
};