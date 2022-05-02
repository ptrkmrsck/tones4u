<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import Archive from '$lib/components/Archive.svelte';
	import Ramp from '$lib/components/Ramp.svelte';
	import { makePlaceholder, allData, validateURL } from '$lib/data.js';

	let value = '';
	let submitted = false;
	let archiveToggle = false;
	let url, searchParams;

	let placeholder = makePlaceholder();
	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');
	let osc = $allData[0].osc;
	let oscTypes = ['sine', 'triangle', 'sawtooth', 'square'];

	$: if (osc) oscChange(osc);

	const handleSubmit = async (e) => {
		submitted = true;

		addToArchive(value, url.href);
		const { data, error } = await db
			.from('tones4uArchive')
			.insert([{ description: value, url: url.href }]);
		console.log(value, url.href);

		try {
			fetch('/api/archive', {
				method: 'POST',
				header: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					description: value,
					url: url.href
				})
			});
		} catch (e) {
			console.error(e);
		}
		setTimeout(() => {
			submitted = false;
			value = '';
		}, 1200);
	};
	let archiveClick = () => {
		archiveToggle = !archiveToggle;
	};
	onMount(() => {
		// let regex = /\d[=]/gm;
		url = new URL(window.location.toString());
		searchParams = validateURL(url) ? url.searchParams : false;
	});

	let oscChange = (o) => {
		$allData.forEach((x, i) => {
			$allData[i].osc = o;
		});
	};
</script>

<div class="background" on:click={close} />
<main>
	<button class="close" on:click={close}>x</button>
	{#if !archiveToggle}
		<p>Ty for visiting ⏦tones4u.org⏦</p>
		<p>To turn on a tone click/toggle the <span class="circle">◯</span></p>
		<p>Make sure your device is not in "silent mode"</p>
		<p>Headphones are recommended</p>
		<p>
			Click the "click to share" button to copy the ⏦tones4u⏦ sharing link for sharing. At least one
			tone must be active to share.
		</p>
		{#if searchParams}
			<p>
				Submit your tones to the ⏦<span class="archive-link" on:click={archiveClick}
					>Tones Archive</span
				>⏦ by describing them with as few words as possible and clicking submit:
			</p>

			<div class="sub">
				<input
					{placeholder}
					type="text"
					name="description"
					id="description"
					title="describe your tones here"
					maxlength="60"
					bind:value
				/>
				<button class="submit" disabled={!value} on:click={handleSubmit}
					>{submitted ? '_ty:)_' : 'submit'}</button
				>
			</div>
		{:else}
			<p><span class="archive-link" on:click={archiveClick}>⏦Tones Archive⏦</span></p>
		{/if}
		<hr />
		<p>Tone Type:</p>

		<div class="tonetype">
			{#each oscTypes as o}
				<label class="tonetype">
					<input type="radio" bind:group={osc} value={o} />
					{o}
				</label>
			{/each}
		</div>

		<p>Gliss Length:</p>
		<Ramp />
	{:else}
		<p><span on:click={archiveClick} class="archive-link">&lt;&lt; back</span></p>
		<p class="title">⏦Tones Archive⏦</p>
		<Archive />
	{/if}
</main>

<style>
	main {
		background: blue;
		max-width: 450px;
		margin: 0;
		padding: 0.8rem 1.3rem 1rem 1.3rem;
		border: 1px solid white;
		max-height: 96vh;
		overflow: scroll;
	}
	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	button {
		background-color: red;
		font-family: inherit;
		border: 1px solid white;
		color: inherit;
		margin: 0;
		cursor: pointer;
	}

	button:disabled {
		opacity: 50%;
		cursor: none;
	}
	.submit {
		padding: 0.6rem 0.8rem;
	}
	.close {
		font-size: 1.4rem;
		padding-bottom: 0.35rem;
		position: absolute;
		top: 0;
		right: 0;
	}
	input[type='text'] {
		width: 100%;
		background: inherit;
		color: inherit;
		font-family: inherit;
		caret-color: white;
		border: 1px solid white;
		border-radius: 0;
	}

	input[type='text']:focus {
		outline: none;
		box-shadow: 3px 3px red;
	}

	::placeholder {
		opacity: 90%;
		font-size: 1rem;
		font-style: italic;
		color: red;
	}

	::selection {
		background: white;
		color: red;
	}
	/* a {
		text-decoration: underline;
		color: inherit;
	} */
	.sub {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		gap: 2rem;
	}
	.circle {
		font-size: 1.4rem;
	}
	.archive-link {
		text-decoration: underline;
		cursor: pointer;
	}

	.title {
		text-align: center;
		font-size: 1.2rem;
	}

	.tonetype {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	hr {
		margin-top: 1rem;
		border: 0.5px solid white;
	}

	.tonetype label {
		margin-left: 4px;
		margin-right: 0.8rem;
	}

	input[type='radio'] {
		appearance: none;
		background-color: inherit;

		font: inherit;
		color: currentColor;
		width: 1.15em;
		height: 1.15em;
		border: 0.15em solid white;
		border-radius: 50%;
		display: grid;
		place-content: center;
		cursor: pointer;
		transform: translateY(-0.075em);
		transition: all 1s;
	}

	input[type='radio']:checked {
		background-color: white;
	}

	@media (max-width: 1075px) {
		input {
			font-size: 16px;
		}
	}
</style>
