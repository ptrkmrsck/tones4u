<script>
	import supabase from '$lib/supabase';
</script>

<div>
	{#await supabase.from('tones4uArchive').select('*')}
		<p>⏦loading⏦</p>
	{:then value}
		{#each value.data as i}
			<p><a href={i.url}>{i.description}</a></p>
		{/each}
	{/await}
</div>

<style>
	div {
		text-align: right;
	}
	a {
		color: inherit;
	}

	a:hover {
		color: blue;
		background-color: red;
	}
</style>
