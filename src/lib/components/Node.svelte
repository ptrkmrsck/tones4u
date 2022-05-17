<script>
	import * as Tone from 'tone';
	import { onMount } from 'svelte';
	import { replaceStateWithQuery } from '$lib/url';

	export let toneData;
	export let toneId;
	export let pan = 0;

	//todo: add onDestroy
	let value = toneData.freq;
	let lockStatus = false;

	let osc, panner;

	$: if (osc) freqRamp(toneData.freq);
	$: if (osc) toggle(toneData.status);
	$: if (osc) osc.type = toneData.osc;

	onMount(() => {
		panner = new Tone.Panner({
			pan
		}).toDestination();

		osc = new Tone.Oscillator({
			frequency: toneData.freq,
			type: toneData.osc,
			volume: -Infinity
		}).connect(panner);
	});

	let startTone = () => {
		//turn on tone
		osc.start();
		osc.volume.rampTo(toneData.volume, 1);
		//add to query string
		replaceStateWithQuery({ [toneId]: toneData.freq });
	};

	let stopTone = () => {
		//turn off tone and remove from query string
		replaceStateWithQuery({ [toneId]: null });
		osc.volume.rampTo(-Infinity, 1);
		osc.stop('+1.6');
	};

	let toggle = (status) => {
		if (status) {
			startTone();
			return;
		}
		stopTone();
	};

	const freqRamp = (f) => {
		osc.frequency.rampTo(f, toneData.rampTime);
		value = f;
	};

	const handleChange = (e) => {
		if (e.target.value > 0 && e.target.value < 10001) {
			toneData.freq = e.target.value;
		}
	};

	const lockToggle = (e) => {
		if (!e.target.matches('input')) {
			lockStatus = !lockStatus;
			toneData.locked = lockStatus;
		}
	};
</script>

<main class:lockStatus on:click={lockToggle}>
	<input
		title="click for tone"
		type="checkbox"
		name="startstop"
		id="startstop"
		bind:checked={toneData.status}
	/>
	<label for="start-stop" />

	<label name="click for tone" class={'freq'} for={toneId}
		>frequency (hz):
		<input
			type="number"
			min="0"
			max="10000"
			name={toneId}
			id={toneId}
			step="0.01"
			{value}
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
		cursor: pointer;
	}
	input[type='number'] {
		width: 5.2rem;
		background: inherit;
		color: inherit;
		font-family: inherit;

		border: 1px solid white;
		border-radius: 0;
		caret-color: white;
	}

	input[type='number'],
	.freq {
		font-size: 16px;
	}

	input[type='number']:focus {
		outline: none;
		box-shadow: 3px 3px blue;
	}

	.lockStatus input[type='number']:focus {
		box-shadow: 3px 3px red;
	}

	.freq {
		color: white;
		cursor: pointer;
	}
	.lockStatus {
		background: blue;
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
		z-index: 2;
		appearance: none;
		-webkit-appearance: none;
	}
	input[type='checkbox']:checked {
		background: white;
	}
</style>
