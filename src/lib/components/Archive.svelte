<script>
	import { allData } from '$lib/data.js';

	const get = async () => {
		const response = await fetch('/api.json');
		const data = await response.json();
		return data;
	};

	let archiveClick = (e) => {
		$allData.forEach((x, i) => {
			$allData[i].freq = 0;
		});

		let archiveURL = new URL(e.target.dataset.url);
		for (const [k, v] of archiveURL.searchParams.entries()) {
			$allData[k].freq = v;
		}
	};
</script>

<div>
	{#await get()}
		<p>⏦loading⏦</p>
	{:then value}
		{#each value.data as i}
			<p><span data-url={i.url} on:click={archiveClick}>{i.description}</span></p>
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
