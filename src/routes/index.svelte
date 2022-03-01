<script>
	import Tone from '$lib/tone.svelte';
</script>

<main>
	<line />
	<Tone freq="200" pan="-1" />
	<Tone freq="300" pan="-1" />
	<Tone freq="330" pan="1" />
	<Tone freq="375" pan="1" />
</main>

<style>
	main {
		height: 100vh;
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
	@media (max-width: 1275px) {
		main {
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 2rem;
		}
	}
</style>
