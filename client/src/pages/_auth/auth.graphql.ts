import { useMutation, useQuery } from '@sveltestack/svelte-query';
import request, { gql } from 'graphql-request';
import type { User } from './auth.types';

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
	const data = await request<{ userSession: { id: string; user: { id: string; email: string } } }>(
		'/graphql',
		gql`
			query {
				userSession {
					id
					user {
						email
						id
					}
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

type LogIn = { email: string; password: string };

export const useLogIn = () => {
	return useMutation(async (user: LogIn) => {
		const response = await request<{ createUserSession: { id: string; user: User } }>(
			'/graphql',
			gql`
				mutation ($email: String!, $password: String!) {
					createUserSession(email: $email, password: $password) {
						id
						user {
							id
							email
						}
					}
				}
			`,
			{ ...user }
		);
		return response.createUserSession;
	});
};

// export function useFindAllBills(): UseQueryResult<Bill[], Error> {
//   return useQuery<Bill[], Error>("bills", async () => {
//     const { bills } = await request<{ bills: Bill[] }>(
//       "/graphql",
//       gql`
//         query {
//           bills {
//             id
//             name
//             category
//             income
//             frequency
//             qrCode
//             isPayed
//             defaultValue
//             defaultAccountNumber
//             defaultAccountReciever
//             defaultAccountDescription
//             payments {
//               id
//               value
//               date
//               accountNumber
//               accountReciever
//               accountDescription
//             }
//           }
//         }
//       `,
//     );
//     return bills;
//   });
// }

// export function useFindBillById(billId: string | null): UseQueryResult<Bill, Error> {
//   return useQuery<Bill, Error>(
//     ["bill", billId],
//     async () => {
//       const { bill } = await request<{ bill: Bill }>(
//         "/graphql",
//         gql`
//         query {
//           bill(billId: "${billId}") {
//             id
//             name
//             income
//             frequency
//             category
//             qrCode
//             isPayed
//             defaultValue
//             defaultAccountNumber
//             defaultAccountReciever
//             defaultAccountDescription
//           }
//         }
//       `,
//       );
//       return bill;
//     },
//     {
//       enabled: !!billId,
//     },
//   );
// }

// export const useAddOrEditBill = (): UseMutationResult<Bill, Error, Bill> => {
//   return useMutation<Bill, Error, Bill>(async (data: Bill) => {
//     const { createBill } = await request<{ createBill: Bill }>(
//       "/graphql",
//       gql`
//         mutation(
//           $id: ID
//           $name: String!
//           $income: Boolean!
//           $frequency: String!
//           $category: String!
//           $qrCode: Boolean!
//           $defaultValue: Float
//           $defaultAccountNumber: String
//           $defaultAccountReciever: String
//           $defaultAccountDescription: String
//         ) {
//           createBill(
//             id: $id
//             name: $name
//             income: $income
//             frequency: $frequency
//             category: $category
//             qrCode: $qrCode
//             defaultValue: $defaultValue
//             defaultAccountNumber: $defaultAccountNumber
//             defaultAccountReciever: $defaultAccountReciever
//             defaultAccountDescription: $defaultAccountDescription
//           ) {
//             id
//           }
//         }
//       `,
//       data,
//     );
//     return createBill;
//   });
// };

// export const useDeleteBill = (): UseMutationResult<void, Error, string> => {
//   return useMutation<void, Error, string>(async (billId: string) => {
//     await request(
//       "/graphql",
//       gql`
//         mutation($billId: ID!) {
//           deleteBill(id: $billId) {
//             id
//           }
//         }
//       `,
//       { billId },
//     );
//   });
// };
