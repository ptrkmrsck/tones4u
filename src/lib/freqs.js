import { writable } from 'svelte/store';

export const freqs = writable({
	freq1: null,
	freq2: null,
	freq3: null,
	freq4: null
});
