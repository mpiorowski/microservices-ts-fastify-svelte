<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import Login from './login/index.svelte';
	import { auth, logout } from './_auth/auth.graphql';
	const queryClient = new QueryClient();

	let isAuth = false;
	let isLoading = true;
	const handleLogout = () => {
		logout().then(() => (isAuth = false));
		// document.cookie = 'sessionId=null; path=/';
		// let allCookies = document.cookie;
		// console.log(document.cookie);
		// isAuth = false;
	};

	$: auth()
		.then((response) => {
			if (response && response.id) {
				isAuth = true;
				isLoading = false;
			}
		})
		.catch((err) => {
			isAuth = false;
			isLoading = false;
		});

	// const response = auth();
	// const checkAuth = (response: { id: string }) => {
	// 	if (response.id) {
	// 		isAuth = true;
	// 	}
	// };

	// $: {
	// 	response, checkAuth(response);
	// }

	// const response = auth();
	// console.log(response);

	// $: {
	// 	const response = auth();
	// 	console.log(response);
	// }
	// const auth = useAuth();
</script>

<QueryClientProvider client={queryClient}>
	{#if isLoading}
		LOADING
	{/if}
	{#if !isLoading}
		{#if !isAuth}
			<Login login={() => (isAuth = true)} />
		{/if}
		{#if isAuth}
			<button on:click={handleLogout}>log out</button>
			<slot />
		{/if}
	{/if}
</QueryClientProvider>
