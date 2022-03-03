<script>
	import { onMount } from 'svelte';
	import { freqs } from '$lib/freqs';

	import * as Tone from 'tone';
	import { replaceStateWithQuery } from './url';

	let onOff, osc;
	export let toneId;
	export let pan = 0;

	onMount(() => {
		let panner = new Tone.Panner({
			pan
		}).toDestination();
		osc = new Tone.Oscillator({
			frequency: $freqs[toneId],
			type: 'sine',
			volume: -Infinity
		}).connect(panner);
	});

	let toggle = () => {
		if (onOff) {
			//turn on tone
			osc.start();
			osc.volume.rampTo(-12, 0.5);
			osc.frequency.rampTo($freqs[toneId], 1);
			//add to query string
			replaceStateWithQuery({ [toneId]: $freqs[toneId] });
			return;
		}
		//turn off tone
		replaceStateWithQuery({ [toneId]: null });
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

	<label name="click for tone" class={'freq'} for={toneId}
		>frequency (hz)
		<input
			type="number"
			min="20"
			max="10000"
			name={toneId}
			id={toneId}
			step="0.1"
			bind:value={$freqs[toneId]}
			on:change={() => {
				osc.frequency.rampTo($freqs[toneId], 1);
				if (onOff) replaceStateWithQuery({ [toneId]: $freqs[toneId] });
			}}
		/>
	</label>
</main>

<style>
	main {
		background: red;
		display: inline-flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		min-width: 100px;
		padding: 0.9rem;
		font-size: 1rem;
	}
	input[type='number'] {
		width: 5rem;
		background: inherit;
		color: inherit;
		font-family: inherit;
		font-size: 1rem;
		border: 1px solid white;
	}
	input[type='number']:focus {
		outline: none;
		box-shadow: 3px 3px #0000ff;
	}
	.freq {
		color: white;
	}
	::selection {
		background: blue;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
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
