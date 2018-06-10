import util from 'utils/util';

const invariant = util.invariant;
const shuffle = util.shuffle;

export default (data) => {
	const MARKET_SIZE = 5;

	function copy () {
		return Object.assign({}, data);
	}

	return {
		market: () => {
			return [...data.market];
		},

		drawPile: () => {
			return [...data.drawPile];
		},

		rubies: () => {
			return [...data.rubies];
		},

		refillMarket: () => {
			const amount = MARKET_SIZE - data.market.length;

			if (amount > 0) {
				const c = copy();

				while (amount--) {
					if (c.market.length) {
						c.market.push(c.drawPile.pop());
					}
				}
				return c;
			}

			return data; // no change
		},

		shuffle: () => {
			const c = copy();
			c.drawPile = shuffle(c.drawPile);
			return c;
		},

		removeFromMarket: (cards) => {
			const c = copy();

			cards.forEach((card) => {
				const index = c.market.indexOf(card);

				invariant(
					index !== -1,
					`Did not find one of the cards in the market.`
				);

				c.market.splice(index, 1);
			});

			return c;
		},

		removeFromDrawPile: (cards) => {
			const c = copy();

			cards.forEach((card) => {
				const index = c.market.indexOf(card);

				invariant(
					index !== -1,
					`Did not find one of the cards in the draw pile.`
				);

				c.drawPile.splice(index, 1);
			});

			return c;
		}
	};
};