<script>
	import { allData } from '$lib/data.js';

	let rampTime = $allData[0].rampTime;

	let rampChange = () => {
		$allData.forEach((x, i) => {
			$allData[i].rampTime = rampTime;
		});
	};
</script>

//TODO fix slider formatting for firefox

<main>
	<input
		type="range"
		name="ramptime"
		id="ramptime"
		min=".1"
		max="5"
		bind:value={rampTime}
		on:change={rampChange}
		step=".01"
	/>
	<label for="ramptime">{rampTime.toFixed(2)} sec{rampTime > 1 ? 's' : ''}</label>
</main>

<style>
	main {
		width: 100%;
		display: grid;
		grid-template-columns: 3fr 1fr;
		margin-bottom: 1rem;
		align-items: center;
	}
	label {
		padding-left: rem;
	}
	input {
		width: 95%;
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}

	input:focus {
		outline: none;
	}

	input::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 35px;
		width: 20px;
		background: white;
		cursor: pointer;
	}

	input::-webkit-slider-thumb:hover {
		box-shadow: 1px 1px red;
	}

	input::-webkit-slider-runnable-track {
		width: 100%;
		height: auto;
		cursor: pointer;
		border: 1px solid white;
	}

	input::-moz-range-track {
		width: 100%;
		height: auto;
		cursor: pointer;
		border: 1px solid white;
	}
</style>
