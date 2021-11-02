import { writable } from 'svelte/store';

export const userStore = writable<{ email: string; id: string }>(null);
