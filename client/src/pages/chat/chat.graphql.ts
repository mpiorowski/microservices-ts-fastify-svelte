import { useMutation, useQuery } from '@sveltestack/svelte-query';
import request, { gql } from 'graphql-request';
import type { Chat } from '../../../../@types/types';

export function useFindAllChat(userId: string) {
	return useQuery<Chat[], Error, Chat[]>(['chat', userId], async () => {
		const { chat } = await request<{ chat: Chat[] }>(
			'/graphql',
			gql`
				query {
					chat(userId: "${userId}") {
						user {
							id
							email
						}
						message
					}
				}
			`
		);
		return chat;
	});
}

export const useAddChat = () => {
	return useMutation(async (data: { userId: string; message: string }) => {
		const { createBill } = await request<{ createBill: { id: string } }>(
			'/graphql',
			gql`
				mutation ($userId: ID!, $message: String!) {
					createChat(userId: $userId, message: $message) {
						id
					}
				}
			`,
			data
		);
		return createBill;
	});
};
