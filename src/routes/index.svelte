<script>
	import Tone from '$lib/tone.svelte';
	import Menu from '$lib/menu.svelte';
	import { onMount } from 'svelte';
	import { freqs } from '$lib/freqs.js';

	let copied = 'click to share';
	let menuToggle = false;

	onMount(() => {
		let url = new URL(window.location.toString());
		let searchParams = url.href.includes('freq');
		// if there is a query string set all freqs to null and reset with query vals
		if (searchParams) {
			for (const [k, v] of url.searchParams.entries()) {
				$freqs[k] = v;
			}
			return;
		}
		// if no query string set random tones
		rndmFreqs();
	});

	let copyClick = () => {
		let url = new URL(window.location.toString());
		let searchParams = url.href.includes('freq');
		if (searchParams) {
			const copyurl = new URL(window.location.toString());
			navigator.clipboard.writeText(copyurl);
			copied = 'sharing link copied';
		} else if (!searchParams) {
			copied = 'ERROR: no tones active :( turn tones on to share';
		}
		setTimeout(() => {
			copied = 'click to share';
		}, 2000);
	};
	// let clearFreqs = () => {
	// 	Object.keys($freqs).forEach((k) => ($freqs[k] = null));
	// };

	let rndmFreqs = () => {
		Object.keys($freqs).forEach((k) => ($freqs[k] = (Math.random() * 1000 + 60).toFixed(2)));
	};
</script>

<main>
	{#if menuToggle}
		<div class="menu">
			<Menu on:close={() => (menuToggle = !menuToggle)} />
		</div>
	{:else}
		<button class="menu" on:click={() => (menuToggle = !menuToggle)}>???</button>
	{/if}
	<button class="rndm" on:click={rndmFreqs}>rndm</button>
	<Tone toneId="freq3" pan="-1" />
	<Tone toneId="freq1" pan="-1" />
	<Tone toneId="freq2" pan="1" />
	<Tone toneId="freq4" pan="1" />
	<button
		title="click to copy tones4u sharing link to your clipboard"
		class="copy"
		on:click={copyClick}>{copied}</button
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
		z-index: 1;
	}
	.menu {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		max-width: 50%;
	}

	@media (max-width: 1075px) {
		main {
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 2rem;
		}
		.menu {
			max-width: 100%;
		}
	}
	@media (max-height: 450px) {
		.copy {
			position: relative;
		}
	}
</style>
