<script>
	import { onMount } from 'svelte';

	import * as Tone from 'tone';

	let onOff, osc;
	export let freq = 200;
	export let pan = 0;

	onMount(() => {
		let panner = new Tone.Panner({
			pan
		}).toDestination();
		osc = new Tone.Oscillator({
			frequency: freq,
			type: 'sine',
			volume: -Infinity
		}).connect(panner);
	});

	let toggle = () => {
		if (onOff) {
			osc.start();
			osc.volume.rampTo(-12, 0.5);
			return;
		}
		osc.volume.rampTo(-Infinity, 0.5);
		osc.stop('+1.6');
	};
</script>

<main>
	<input
		title="click for tone"
		type="checkbox"
		name="startstop"
		id="startstop"
		bind:checked={onOff}
		on:change={toggle}
	/>
	<label for="start-stop" />

	<label name="click for tone" class="freq" for="freq"
		>frequency (hz)
		<input
			type="number"
			min="20"
			max="10000"
			name="freq"
			id="freq"
			step="0.1"
			bind:value={freq}
			on:change={() => osc.frequency.rampTo(freq, 1)}
		/>
	</label>
</main>

<style>
	main {
		background: red;
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		padding: 0.8rem;
		font-size: 1rem;
	}
	input[type='number'] {
		background: inherit;
		color: white;
		font-family: monospace;
		font-size: 1rem;
		border: 1px solid white;
	}
	input[type='number']:focus {
		outline: none;
		box-shadow: 3px 3px blue;
	}
	.freq {
		font-family: monospace;
		color: white;
	}
	input[type='checkbox'] {
		width: 2rem;
		height: 2rem;
		margin-right: 0.5rem;
		border-radius: 50%;
		transition: all 0.5s;
		border: 2px solid white;
		background: inherit;
		cursor: pointer;
		appearance: none;
		-webkit-appearance: none;
	}
	input[type='checkbox']:checked {
		background: white;
	}
</style>
