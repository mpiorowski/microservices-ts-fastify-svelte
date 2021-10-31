<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import { auth, logout } from './_auth/auth.graphql';
	import Login from './_auth/Login.svelte';
	import Loading from './_components/Loading.svelte';
	import Toast from './_components/Toast.svelte';
	const queryClient = new QueryClient();

	let isAuth = false;
	let isLoading = true;
	const handleLogout = () => logout().then(() => (isAuth = false));

	$: auth()
		.then(async (response) => {
			if (response && response.id) {
				isAuth = true;
				isLoading = false;
			}
		})
		.catch(async (err) => {
			isAuth = false;
			isLoading = false;
			console.error(err);
		});
</script>

<QueryClientProvider client={queryClient}>
	<Toast />
	{#if isLoading}
		<Loading />
	{/if}
	{#if !isLoading}
		{#if !isAuth}
			<Login login={() => (isAuth = true)} />
		{/if}

		<button on:click={handleLogout}>log out</button>
		<slot />
	{/if}
</QueryClientProvider>
