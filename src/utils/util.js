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
	}
};