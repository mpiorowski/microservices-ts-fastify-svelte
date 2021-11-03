<script lang="ts">
	import { useQueryClient } from '@sveltestack/svelte-query';

	import { userStore } from '../_auth/auth.store';
	import { toast, toastSave, ToastType } from '../_components/notifications';
	import { useAddChat, useFindAllChat } from './chat.graphql';

	let message: string;

	const queryClient = useQueryClient();
	const chat = useFindAllChat($userStore.id);

	const addChat = useAddChat();
	const handleSubmit = async () => {
		try {
			await $addChat.mutateAsync({ userId: $userStore.id, message: message });
			queryClient.invalidateQueries(['chat', $userStore.id]);
			toastSave();
		} catch (error) {
			toast(error.response.errors[0].message, ToastType.ERROR, 3000);
			console.log(error);
		}
	};
</script>

<h1>Chat page</h1>
<h2>Current user: {JSON.stringify($userStore)}</h2>
<div class="grid">
	<div class="grid2">
		<textarea bind:value={message} />
		<button on:click={handleSubmit}>Add</button>
	</div>
	<div>
		{#if $chat.isLoading}
			<span>Loading...</span>
		{:else if $chat.isError}
			<span>Error: {$chat.error.message}</span>
		{:else}
			<ul>
				{#each $chat.data as chat}
					<li>{chat.message} - {chat.user.email} - {chat.createdAt}</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	.grid2 {
		display: flex;
		flex-direction: column;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	button {
		margin-top: 10px;
	}
	textarea {
		height: 200px;
		width: 100%;
	}
	ul {
		margin: 0;
	}
</style>
