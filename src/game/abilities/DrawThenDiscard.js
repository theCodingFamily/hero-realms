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
			if (value === 1) {
				return `Draw a card, then discard a card.`;
			}

			return `Draw ${util.numToWord(value)} cards, then discard ${util.numToWord(value)} cards.`;
		}
	};
};