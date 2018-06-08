import util from 'utils/util';

export default (value) => {
	return {
		execute: () => {
			return Promise.resolve();
		},

		value: () => {
			return value;
		},

		text: () => {
			return value === 1 ? `Draw a card.` : `Draw ${util.numToWord(value)} cards.`;
		}
	};
};