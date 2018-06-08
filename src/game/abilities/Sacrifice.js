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
				return `You may sacrifice a card in your hand or discard pile.`;
			}

			return `You may sacrifice up to ${util.numToWord(value)} cards in your hand and/or discard pile.`;
		}
	};
};