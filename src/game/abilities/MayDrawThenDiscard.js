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
				return `You may draw a card. If you do, discard a card.`;
			}

			return `You may draw up to ${util.numToWord(value)} cards, then discard that many cards.`;
		}
	};
};