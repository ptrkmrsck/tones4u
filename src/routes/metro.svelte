<script>
	import * as Tone from 'tone';
	import { onMount, onDestroy } from 'svelte';

	let samplers = [];

	let claves = ['Clave8083.wav', 'Clave8084.wav', 'Clave8088.wav'];
	let count = 1;
	let timesig = 4;
	let bpm = 80;

	onMount(() => {
		claves.forEach((clave) => {
			let sampler = new Tone.Player(`/${clave}`).toDestination();
			samplers.push(sampler);
		});

		Tone.Transport.bpm.value = bpm;

		let loop = new Tone.Loop((time) => {
			console.log(count);
			if (count > 1) {
				samplers[1].start(0);
			} else samplers[0].start(0);
			counter();
		}, '4n').start(0);
	});

	const handleToggle = (e) => {
		if (e.target.checked) {
			console.log('started');
			Tone.Transport.start();
			return;
		}
		Tone.Transport.stop();
		count = 1;
		console.log('stopped');
	};

	const counter = () => {
		if (count >= timesig) {
			count = 1;
			return;
		}
		count++;
	};

	const tempoChange = (e) => {
		Tone.Transport.bpm.value = e.target.value;
	};
</script>

<main>
	<input
		title="start/stop metro"
		type="checkbox"
		name="metrostartstop"
		id="metrostartstop"
		on:change={handleToggle}
	/>
	<br />
	<label
		><input
			type="range"
			name="bpm"
			id="bpm"
			min="20"
			max="250"
			bind:value={bpm}
			on:change={tempoChange}
		/><br />
		{bpm} bpm</label
	>
</main>

<style>
	input[type='checkbox'] {
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		transition: all 0.2s;
		border: 2px solid red;
		background: var(--black);
		cursor: pointer;
		appearance: none;
		-webkit-appearance: none;
		transform: translateX(-1px);
	}
	input[type='checkbox']:checked {
		background: blue;
	}

	input[type='range'] {
		width: 40%;
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}

	input[type='range']:focus {
		outline: none;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 35px;
		width: 20px;
		background: white;
		cursor: pointer;
	}

	input[type='range']::-webkit-slider-thumb:hover {
		box-shadow: 1px 1px red;
	}

	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: auto;
		cursor: pointer;
		border: 1px solid white;
	}

	input[type='range']::-moz-range-track {
		width: 100%;
		height: auto;
		cursor: pointer;
		border: 1px solid white;
	}
</style>
