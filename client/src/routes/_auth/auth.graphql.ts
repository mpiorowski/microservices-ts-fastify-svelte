import { useQuery } from '@sveltestack/svelte-query';
import request, { gql } from 'graphql-request';

export function useAuth() {
	return useQuery('auth', async () => {
		const data = await request<{ userSession: { id: string } }>(
			'/graphql',
			gql`
				query {
					userSession {
						id
					}
				}
			`
		);
		return data.userSession;
	});
}

export async function auth() {
	const data = await request<{ userSession: { id: string } }>(
		'/graphql',
		gql`
			query {
				userSession {
					id
				}
			}
		`
	);
	return data.userSession;
}

export async function logout() {
	const data = await request<{ userSession: { id: string } }>(
		'/graphql',
		gql`
			query {
				logout
			}
		`
	);
	return data.userSession;
}
