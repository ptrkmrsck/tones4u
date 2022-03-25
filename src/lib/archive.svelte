<script>
	import supabase from '$lib/supabase';
	import { freqs } from '$lib/freqs';

	let archiveClick = (e) => {
		$freqs = {
			freq1: '0',
			freq2: '0',
			freq3: '0',
			freq4: '0'
		};

		let archiveURL = new URL(e.target.dataset.url);
		for (const [k, v] of archiveURL.searchParams.entries()) {
			$freqs[k] = v;
		}
	};
</script>

<div>
	{#await supabase.from('tones4uArchive').select('*')}
		<p>⏦loading⏦</p>
	{:then value}
		{#each value.data.reverse() as i}
			{#if i.approved}
				<p><span data-url={i.url} on:click={archiveClick}>{i.description}</span></p>
			{/if}
		{/each}
	{/await}
</div>

<style>
	div {
		text-align: right;
	}
	span {
		color: inherit;
		text-decoration: underline;
	}

	span:hover {
		color: blue;
		background-color: red;
		cursor: pointer;
	}
</style>
