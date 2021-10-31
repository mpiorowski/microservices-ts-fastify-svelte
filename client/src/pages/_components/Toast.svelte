<script lang="ts">
	import { backOut } from 'svelte/easing';
	import { fade,fly } from 'svelte/transition';
	import { notifications,ToastType } from './notifications';

	export let themes: { [key in ToastType]: string } = {
		[ToastType.INFO]: '#5bc0de',
		[ToastType.SUCCESS]: '#84C991',
		[ToastType.ERROR]: '#f0ad4e'
	};
</script>

<div class="notifications">
	{#each $notifications as notification (notification.id)}
		<div
			in:fly={{ delay: 0, duration: 300, x: 0, y: -50, opacity: 0.1, easing: backOut }}
			out:fade={{ duration: 500 }}
			class="toast"
			style="background: {themes[notification.type]};"
		>
			<div class="content">{notification.message}</div>
			{#if notification.icon}<i class={notification.icon} />{/if}
		</div>
	{/each}
</div>

<style>
	.notifications {
		position: fixed;
		top: 10px;
		left: 0;
		right: 0;
		margin: 0 auto;
		padding: 0;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		pointer-events: none;
	}

	.toast {
		flex: 0 0 auto;
		margin-bottom: 10px;
	}

	.content {
		padding: 10px;
		display: block;
		color: white;
		font-weight: 500;
	}
</style>
