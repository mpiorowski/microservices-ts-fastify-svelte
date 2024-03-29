<script lang="ts">
	import * as yup from 'yup';
	import { toast, ToastType } from '../_components/notifications';
	import { useLogIn } from './auth.graphql';
import { userStore } from './auth.store';
	import type { User } from './auth.types';

	let schema: yup.SchemaOf<User> = yup
		.object()
		.shape({
			email: yup.string().email('Email must be valid').required('Email is required'),
			password: yup.string().required('Password is required')
		})
		.defined();

	let user = { email: '', password: '' };
	let errors: { inner: { path: string; message: string }[] } | undefined;
	let firstSubmit = false;

	export let login: () => void;

	$: {
		checkValidation(), user;
	}
	const checkValidation = async () => {
		try {
			if (firstSubmit) {
				await schema.validate(user, { abortEarly: false });
				errors = undefined;
				return true;
			}
			return false;
		} catch (error: any) {
			console.dir(error);
			errors = error;
			return false;
		}
	};

	const logIn = useLogIn();
	const handleSubmit = async () => {
		try {
			firstSubmit = true;
			const valid = await checkValidation();
			if (valid) {
				const response = await $logIn.mutateAsync({
					email: user.email,
					password: user.password
				});
				if (response) {
					userStore.set({ id: response.user.id, email: response.user.email });
					login();
				}
			}
		} catch (error) {
			console.dir(error);
			toast(error.response.errors[0].message, ToastType.ERROR, 2000);
		}
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label for="email">E-mail</label>
	<input
		type="text"
		bind:value={user.email}
		class:input-error={errors?.inner.find((el) => el.path === 'email')}
	/>
	<div class="error">
		{#if errors?.inner.find((el) => el.path === 'email')}
			{errors.inner.find((el) => el.path === 'email')?.message}
		{/if}
	</div>
	<label for="password">Password</label>
	<input
		type="text"
		bind:value={user.password}
		class:input-error={errors?.inner.find((el) => el.path === 'password')}
	/>
	<div class="error">
		{#if errors?.inner.find((el) => el.path === 'password')}
			{errors.inner.find((el) => el.path === 'password')?.message}
		{/if}
	</div>
	<button type="submit">Log in</button>
</form>

<style>
	form {
		display: grid;
		width: 600px;
		margin: auto;
		height: 100vh;
		align-content: center;
	}
	.input-error {
		border-color: red;
	}
	.error {
		color: red;
		text-align: left;
		height: 14px;
		margin-bottom: 20px;
		font-size: 14px;
	}
	label {
		text-align: left;
	}
</style>
