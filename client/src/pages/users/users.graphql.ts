import { useMutation, useQuery } from '@sveltestack/svelte-query';
import request, { gql } from 'graphql-request';
import type { User } from '../../../../@types/types';

export function useFindAllUser() {
	return useQuery<User[], Error, User[]>('users', async () => {
		const response = await request(
			'/graphql',
			gql`
				query {
					users {
						email
					}
				}
			`
		);
		return response.users;
	});
}

export const useAddUser = () => {
	return useMutation(async (data: { email: string; password: string }) => {
		const response = await request<{ createUser: User }>(
			'/graphql',
			gql`
				mutation {
					createUser(email: "${data.email}", password: "${data.password}") {
						id
					}
				}
			`
		);
		return response.createUser;
	});
};