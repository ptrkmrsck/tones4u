<script>
	import { onMount } from 'svelte';
	import { freqs, oscType } from '$lib/freqs';

	import * as Tone from 'tone';
	import { replaceStateWithQuery } from '$lib/url';

	let onOff = false;
	let osc;
	let freq;
	export let toneId;
	export let pan = 0;

	$: if ($freqs[toneId]) freqChange($freqs[toneId]);

	onMount(() => {
		let panner = new Tone.Panner({
			pan
		}).toDestination();
		osc = new Tone.Oscillator({
			frequency: $freqs[toneId],
			type: $oscType,
			volume: -Infinity
		}).connect(panner);
	});

	let startTone = () => {
		//turn on tone
		osc.start();
		osc.volume.rampTo(-6, 0.5);

		//add to query string
		replaceStateWithQuery({ [toneId]: $freqs[toneId] });
	};

	let stopTone = () => {
		//turn off tone and remove from query string
		replaceStateWithQuery({ [toneId]: null });
		osc.volume.rampTo(-Infinity, 0.5);
		osc.stop('+1.6');
	};

	let toggle = () => {
		if (onOff) {
			startTone();
			return;
		}
		stopTone();
	};

	let freqChange = (newFreq) => {
		freq = newFreq;
		osc.frequency.rampTo(newFreq, 2);
		if (onOff) replaceStateWithQuery({ [toneId]: newFreq });
	};

	let handleChange = (event) => {
		freqChange(event.target.value);
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
			min="0"
			max="10000"
			name={toneId}
			id={toneId}
			step="0.1"
			bind:value={freq}
			on:change={handleChange}
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
		border-radius: 0;
		caret-color: white;
	}
	input[type='number']:focus {
		outline: none;
		box-shadow: 3px 3px #0000ff;
	}
	.freq {
		color: white;
	}
	::selection {
		background: white;
		color: blue;
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
		width: 2.5rem;
		height: 2.5rem;
		margin-right: 0.9rem;
		border-radius: 50%;
		transition: all 1s;
		border: 2px solid white;
		background: inherit;
		cursor: pointer;
		appearance: none;
		-webkit-appearance: none;
	}
	input[type='checkbox']:checked {
		background: white;
	}

	@media (max-width: 1075px) {
		input[type='number'],
		.freq {
			font-size: 16px;
		}
	}
</style>
