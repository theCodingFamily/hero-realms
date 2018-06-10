import util from 'utils/util';

const invariant = util.invariant;
const shuffle = util.shuffle;

function deck (cards) {
	// [0...N] where N is considered the "top" card of the deck

	const _api = {
		count: () {
			return cards.length;
		},

		peekTop: () {
			return cards[cards.length - 1];
		},

		remove: (card) {
			const index = cards.indexOf(card);

			invariant(
				index !== -1,
				`Did not find the card in the deck.`
			);

			cards.splice(index, 1);

			return _api;
		},

		add: (card) {
			// add to the top of the deck
			
			invariant(
				cards.indexOf(card) === -1,
				`Card is already in the deck.`
			);

			cards.push(card);

			return _api;
		},

		shuffle: () {
			cards = shuffle(cards);
			return _api;
		}
	};

	return _api;
}