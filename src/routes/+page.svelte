<script>
	import Node from '$lib/components/Node.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import { onMount } from 'svelte';
	import { allData, rndmmtof, validateURL } from '$lib/data.js';

	let copied = 'click to share';
	let menuToggle = false;

	onMount(() => {
		let { validURL, url } = getUrl();
		// console.log(validURL);
		// if there is a query string set all freqs to null and reset with query vals
		if (validURL) {
			$allData.forEach((x, i) => {
				$allData[i].freq = null;
			});
			for (const [k, v] of url.searchParams.entries()) {
				$allData[k - 1].freq = v;
			}
			return;
		}
	});

	let rndmFreqs = () => {
		$allData.forEach((x, i) => {
			if (!$allData[i].locked) {
				$allData[i].freq = rndmmtof();
			}
		});
	};

	const getUrl = () => {
		let url = new URL(window.location.toString());
		//validate query string
		let validURL = validateURL(url);
		return {
			validURL,
			url
		};
	};

	let copyClick = () => {
		let { validURL, url } = getUrl();
		if (validURL) {
			navigator.clipboard.writeText(url);
			copied = 'sharing link copied!';
			setTimeout(() => {
				copied = 'click to share';
			}, 1500);
		} else if (!validURL) {
			copied = 'ERROR: No tones active. Turn on at least one tone to share';
			setTimeout(() => {
				copied = 'click to share';
			}, 3200);
		}
	};
	const handleToggle = (e) => {
		$allData.forEach((x, i) => {
			$allData[i].status = e.target.checked;
		});
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

	{#each $allData as toneData, i}
		<Node toneId={i + 1} pan={i < $allData.length / 2 ? -1 : 1} bind:toneData />
	{/each}

	<input
		title="turn all on/off"
		type="checkbox"
		name="startstop"
		id="startstop"
		on:change={handleToggle}
	/>
	<label for="start-stop" />

	<button
		title="click to copy tones4u sharing link to your clipboard"
		class="copy"
		on:click={copyClick}
		>{copied}
	</button>
</main>

<style>
	main {
		height: 97vh;
		overflow-y: hidden;
		min-height: 450px;
		align-content: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
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
		font-size: 1.2rem;
		color: inherit;
		margin: 0;
		border: none;
		cursor: pointer;
		position: absolute;
		padding: 0.8rem 1.2rem;
	}
	.rndm {
		bottom: 0;
		z-index: 1;
	}
	.copy {
		max-width: 50%;
		right: 0;
		top: 0;
	}
	.menu {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 3;
		max-width: 50%;
	}

	input[type='checkbox'] {
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		transition: all 1s;
		border: 2px solid red;
		background: var(--black);
		cursor: pointer;
		appearance: none;
		-webkit-appearance: none;
		transform: translateX(-1px);
	}
	input[type='checkbox']:checked {
		background: blue;
	}

	@media (max-width: 600px) {
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
