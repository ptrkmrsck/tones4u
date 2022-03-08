<script>
	import { createEventDispatcher } from 'svelte';
	let value = '';
	let submitted = false;

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	const handleSubmit = () => {
		submitted = true;
		const url = new URL(window.location.toString());
		console.log(value, url.href);
		setTimeout(() => {
			submitted = false;
			value = '';
		}, 1500);
	};

	//TODO: hook up database and build out archive :)
</script>

<div class="background" on:click={close} />
<main>
	<button class="close" on:click={close}>X</button>
	<p>⏦Ty for visiting tones4u⏦</p>
	<p>To turn on a tone toggle/click the <span class="circle">◯</span></p>
	<p>Headphones are recommended</p>
	<p>Click the "click to share" button to copy the ~tones4u~ sharing link for sharing</p>

	<p>
		Submit your tones to the <a href="/archive">Tones Archive</a> by describing it with as few words
		as possible and clicking submit:
	</p>

	<div class="sub">
		<input type="text" name="" id="" bind:value />
		<button class="submit" disabled={!value} on:click={handleSubmit}
			>{submitted ? '_ty:)_' : 'submit'}</button
		>
	</div>
</main>

<style>
	main {
		background: blue;
		margin: 0;
		padding: 0.8rem 1rem 0.8rem 1rem;
		border: 1px solid white;
	}
	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	button {
		background-color: red;
		font-family: inherit;
		border: 1px solid white;
		color: inherit;
		margin: 0;
		cursor: pointer;
	}

	button:disabled {
		opacity: 50%;
		cursor: none;
	}
	.submit {
		padding: 0.6rem 0.8rem;
	}
	.close {
		font-size: 1.4rem;
		position: absolute;
		top: 0;
		right: 0;
	}
	input {
		width: 100%;
		background: inherit;
		color: inherit;
		font-family: inherit;
		border: 1px solid white;
	}
	input:focus {
		outline: none;
		box-shadow: 3px 3px red;
	}
	::selection {
		background: white;
		color: red;
	}
	a {
		text-decoration: underline;
		color: inherit;
	}
	.sub {
		display: flex;
		justify-content: space-between;
		align-items: center;

		width: 100%;
		gap: 2rem;
	}
	.circle {
		font-size: 1.4rem;
	}

	@media (max-width: 1075px) {
		input {
			font-size: 16px;
		}
	}
</style>
