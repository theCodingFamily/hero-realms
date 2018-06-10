export default {
	/*
		Converts numbers from 0 .. 10 to their word representation. Numbers > 10 are returned as numeric strings.
		ex: 
			0 => 'zero'
			3 => 'three'
			10 => 'ten'
			11 => '11'
			-1 => '-1'
	 */
	numToWord: (() => {
		const units = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

		return (n) => {
			if (0 <= n && n < units.length) {
				return units[n];
			}
			return '' + n;
		};
	})(),

	isFunction: (f) => {
		return typeof f === 'function';
	},

	isBlankString: (s) => {
		return typeof s !== 'string' || s.trim().length === 0;
	},

	isNotBlankString: (s) => {
		return typeof s === 'string' && s.trim().length > 0;
	},

	isPositiveInt: (n) => {
		return Number.isInteger(n) && n > 0;
	},

	sum: (arr) => {
		if (!Array.isArray(arr)) {
			throw new Error(`Can only sum() an array (arr=${arr}).`);
		}

		return arr.reduce((total, value) => {
			return total + value;
		}, 0);
	},

	invariant: (cond, message) => {
		if (!cond) {
			throw new Error(`Invariant violation: ${message}`);
		}
	},

	shuffle: (arr) => {
		const copy = [...arr];
		const len = copy.length;
		let i;
		let j;
		let temp;

		for (i = 0; i < len; i++) {
			// randomly swap locations
			j = Math.floor(Math.random() * len); // get an integer from 0 ... (len - 1)
			temp = copy[i];
			copy[i] = copy[j];
			copy[j] = temp;
		}

		return copy;
	}
};