import { writable } from 'svelte/store';

const NUMFREQS = 4;
let rndmMin = 39;
let rndmMax = 99;

let emptyArray = new Array(NUMFREQS).fill(0);

export const rndmmtof = () => {
	return (Math.pow(2, (Math.random() * (rndmMax - rndmMin) + rndmMin - 69) / 12) * 440).toFixed(2);
};

let appState = emptyArray.map(() => {
	return {
		freq: rndmmtof(),
		osc: 'sine',
		status: false,
		volume: -6,
		rampTime: 2,
		locked: false
	};
});

export const allData = writable(appState);

const rdmToneWord = () => {
	return toneWords[Math.floor(Math.random() * toneWords.length)];
};
export const makePlaceholder = () => {
	return `${rdmToneWord()}, ${rdmToneWord()}, and ${rdmToneWord()}`;
};

export const validateURL = (url) => {
	const regex = /\d[=]/gm;
	return regex.exec(url.href);
};

const toneWords = [
	'thick',
	'sharp',
	'crunchy',
	'wet',
	'warm',
	'muffled',
	'gooey',
	'creamy',
	'buoyant',
	'wooly',
	'wispy',
	'wide',
	'weavy',
	'washy',
	'utterly disrespectful',
	'tubey',
	'trashy',
	'tinny',
	'tingly',
	'tight',
	'thin',
	'tentative',
	'stretchy',
	'stinky',
	'stanky',
	'squishy',
	'squigy',
	'spare',
	'spanky',
	'spacious',
	'smushy',
	'sloshy',
	'shattering',
	'savory',
	'saucey',
	'ringing',
	'rich',
	'resonant',
	'raspy',
	'open',
	'mushy',
	'murky',
	'molasses-like',
	'moist',
	'messy',
	'lazy',
	'layered',
	'juicy',
	'jagged',
	'insane',
	'icy',
	'hot',
	'hollow',
	'fuzzy',
	'fresh',
	'fluttery',
	'fluffy',
	'flubby',
	'floppy',
	'floaty',
	'flirty',
	'fat',
	'farty',
	'expressive',
	'echoey',
	'dry',
	'dreamy',
	'dinky',
	'dense',
	'dank',
	'cushy',
	'cushiony',
	'crackly',
	'complex',
	'clicky',
	'clean',
	'chocolate',
	'chilling',
	'cavernous',
	'buzzy',
	'buttery',
	'bright',
	'braided',
	'bombastic',
	'bloomed',
	'bending',
	'behind',
	'basic',
	'anxiety inducing',
	'ahead',
	'blue',
	'red',
	'green',
	'grey',
	'cyan',
	'yellow',
	'silver'
];
