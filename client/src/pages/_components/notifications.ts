import { writable } from 'svelte/store';
import { v4 } from 'uuid';

// const TIMEOUT = 3000;

export const notifications = writable([]);

export enum ToastType {
	INFO = 'INFO',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR'
}

export const toast = (message: string, type: ToastType, timeout: number): void => {
	notifications.update((state) => {
		return [...state, { id: v4(), type, message }];
	});
	setTimeout(() => {
		notifications.update((state) => {
			return state.filter((_a, i) => i > 0) || [];
		});
	}, timeout);
};
