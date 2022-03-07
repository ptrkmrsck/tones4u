<script>
	import Tone from '$lib/tone.svelte';
	import { replaceStateWithQuery } from '$lib/url.js';
	import { onMount } from 'svelte';
	import { freqs } from '$lib/freqs.js';

	let copied = false;
	let toneElement;

	onMount(() => {
		const url = new URL(window.location.toString());
		// if there is a query string set all freqs to null and reset with query vals
		if ([...url.searchParams.entries()].length > 0) {
			clearFreqs();
			for (const [k, v] of url.searchParams.entries()) {
				$freqs[k] = v;
			}
			return;
		}
		rndmFreqs();
	});

	let clearFreqs = () => {
		Object.keys($freqs).forEach((k) => ($freqs[k] = null));
	};

	let copyClick = async () => {
		try {
			const copyurl = new URL(window.location.toString());
			await navigator.clipboard.writeText(copyurl);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 1500);
		} catch (e) {
			console.error('e', e);
		}
	};

	let rndmFreqs = () => {
		Object.keys($freqs).forEach((k) => ($freqs[k] = (Math.random() * 1000 + 40).toFixed(2)));
	};

	let rndmClick = () => {
		clearFreqs();
		replaceStateWithQuery($freqs);
		location.reload();
	};
	// let rndmClick = () => {
	// 	rndmFreqs();
	// };

	let allOnOff = () => {
		toneElement.turnOff();
	};

	//bind:this={toneElement}
</script>

<main>
	<button class="rndm" on:click={rndmClick}>rndm</button>
	<button class="allOnOff" on:click={allOnOff}>all off/on</button>
	<Tone bind:this={toneElement} toneId="freq3" pan="-1" />
	<Tone toneId="freq1" pan="-1" />
	<Tone toneId="freq2" pan="1" />
	<Tone toneId="freq4" pan="1" />
	<button class="copy" on:click={copyClick}
		>{copied ? 'sharing link copied' : 'click to share'}</button
	>
</main>

<style>
	main {
		height: 98vh;
		min-height: 450px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-direction: row;
		flex-wrap: nowrap;
		align-content: center;
		gap: 0.5rem;
	}
	main:after {
		content: '';
		position: absolute;
		z-index: -1;
		top: 0;
		bottom: 0;
		left: 50%;
		border-left: 2px solid blue;
		transform: translateX(-1px);
	}

	button {
		background-color: blue;
		font-family: inherit;
		color: inherit;
		margin: 0;
		border: none;
		cursor: pointer;
		position: absolute;
		padding: 0.6rem 0.8rem;
	}
	.copy {
		bottom: 0;
	}
	.rndm {
		right: 0;
		top: 0;
	}
	.allOnOff {
		left: 0;
		top: 0;
	}

	@media (max-width: 1075px) {
		main {
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 2rem;
		}
	}
	@media (max-height: 450px) {
		.copy {
			position: relative;
		}
	}
</style>
