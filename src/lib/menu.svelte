<script>
	import supabase from '$lib/supabase';
	import { createEventDispatcher, onMount } from 'svelte';
	import { makePlaceholder } from '$lib/freqs.js';
	import Archive from '$lib/archive.svelte';
	let value = '';
	let submitted = false;
	let archiveToggle = false;
	let url = new URL(window.location.toString());
	let searchParams = url.href.includes('freq');

	let placeholder = makePlaceholder();
	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	const handleSubmit = async (e) => {
		submitted = true;
		const { data, error } = await supabase
			.from('tones4uArchive')
			.insert([{ description: value, url: url.href }]);
		setTimeout(() => {
			submitted = false;
			value = '';
		}, 1200);
	};
	let archiveClick = () => {
		archiveToggle = !archiveToggle;
	};
</script>

<div class="background" on:click={close} />
<main>
	<button class="close" on:click={close}>x</button>
	{#if !archiveToggle}
		<p>Ty for visiting ⏦tones4u⏦</p>
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
	{:else}
		<p><span on:click={archiveClick} class="archive-link">&lt;&lt; back</span></p>
		<p class="title">⏦Tones Archive⏦</p>
		<Archive />
	{/if}
</main>

<style>
	main {
		background: blue;
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
	input {
		width: 100%;
		background: inherit;
		color: inherit;
		font-family: inherit;
		border: 1px solid white;
		border-radius: 0;
	}

	input:focus {
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

	@media (max-width: 1075px) {
		input {
			font-size: 16px;
		}
	}
</style>
