<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import { string } from 'yup/lib/locale';
	import { auth, logout } from './_auth/auth.graphql';
	import { userStore } from './_auth/auth.store';
	import Login from './_auth/Login.svelte';
	import Loading from './_components/Loading.svelte';
	import Toast from './_components/Toast.svelte';
	const queryClient = new QueryClient();

	let isAuth = false;
	let isLoading = true;
	const handleLogout = () => logout().then(() => (isAuth = false));

	$: auth()
		.then((response) => {
			if (response && response.id) {
				isAuth = true;
				isLoading = false;
				userStore.set({ id: response.user.id, email: response.user.email });
			} else {
				isAuth = false;
				isLoading = false;
			}
		})
		.catch((err) => {
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
	{#if !isLoading && !isAuth}
		<Login login={() => (isAuth = true)} />
	{/if}
	{#if !isLoading && isAuth}
		<div>
			<a class="button" href="/">Home</a>
			<a class="button" href="/users">Users</a>
			<a class="button" href="/chat">Chat</a>
			<button on:click={handleLogout}>Log out</button>
		</div>
		<slot />
	{/if}
</QueryClientProvider>
