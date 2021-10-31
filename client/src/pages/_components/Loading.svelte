<div class="lds-dual-ring" />

<style>
	.lds-dual-ring {
		display: inline-block;
		position: fixed;
		width: 60px;
		height: 60px;
		top: calc(50% - 30px);
		left: calc(50% - 30px);
	}
	.lds-dual-ring:after {
		content: ' ';
		display: block;
		width: 44px;
		height: 44px;
		margin: 8px;
		border-radius: 50%;
		border: 6px solid gray;
		border-color: gray transparent gray transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}
	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
