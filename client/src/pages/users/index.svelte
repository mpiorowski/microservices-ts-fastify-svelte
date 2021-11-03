<script lang="ts">
	import { useQueryClient } from '@sveltestack/svelte-query';
	import { toast, toastSave, ToastType } from '../_components/notifications';
	import { useAddUser, useFindAllUser } from './users.graphql';

	let user = {
		email: '',
		password: ''
	};

	const queryClient = useQueryClient();
	const users = useFindAllUser();

	const addUser = useAddUser();
	const handleSubmit = async () => {
		try {
			await $addUser.mutateAsync({ email: user.email, password: user.password });
			queryClient.invalidateQueries(['users']);
			toastSave();
		} catch (error) {
			toast(error.response.errors[0].message, ToastType.ERROR, 3000);
			console.log(error);
		}
	};
</script>

<h1>Users page</h1>

<h2>Add new user</h2>
<div>
	<label for="email">Email</label>
	<input id="email" bind:value={user.email} />
</div>
<div>
	<label for="password">Password</label>
	<input id="password" bind:value={user.password} />
</div>
<div>
	<button on:click={handleSubmit}>Add user</button>
</div>

<div>
	{#if $users.isLoading}
		<span>Loading...</span>
	{:else if $users.isError}
		<span>Error: {$users.error.message}</span>
	{:else}
		<p>List of users:</p>
		<ul>
			{#each $users.data as user}
				<li>{user.email}</li>
			{/each}
		</ul>
	{/if}
</div>
