import util from 'utils/util';

const invariant = util.invariant;
const isPositiveInt = util.isPositiveInt;

export default (player /* player data object */) {

	/*
	
	The player data object is never changed (immutable). Instead, a shallow copy is created
	with the new change set in it.

	 */
	
	function copy () {
		return Object.assign({}, player);
	}

	function add (what, value) {
		const c = copy();
		c[what] += value;

		if (c[what] < 0) {
			c[what] = 0;
		}

		return c;
	}

	function push (what, value) {
		const c = copy();
		c[what].push(value);
		return c;
	}

	function concat (what, arr) {
		const c = copy();
		c[what] = c[what].concat(arr);
		return c;
	}

    /* be very explicit with the actions, so that it's easy to understand what is happening */

	return {
		name: () => {
			return player.name;
		},

		rename: (name) => {
			invariant(
				util.isNotBlankString(name), 
				`Player name must be a non-empty string (name=${name}).`
			);

			const c = copy();
			c.name = name;
			return c;
		},

		life: () => {
			return player.life;
		},

		gainLife: (amount) => {
			invariant(
				isPositiveInt(amount),
				`Life amount must be a positive integer (amount=${amount}).`
			);

			return add('life', amount);
		},

		loseLife: (amount) => {
			invariant(
				isPositiveInt(amount),
				`Life amount must be a positive integer (amount=${amount}).`
			);

			return add('life', -amount);
		},

		money: () => {
			return player.money;
		},

		gainMoney: (amount) => {
			invariant(
				isPositiveInt(amount),
				`Money amount must be a positive integer (amount=${amount}).`
			);

			return add('money', amount);
		},

		loseMoney: (amount) => {
			invariant(
				isPositiveInt(amount),
				`Money amount must be a positive integer (amount=${amount}).`
			);

			invariant(
				player.money + amount >= 0,
				`Money can not go negative (amount=${amount}, total=${player.money + amount}).`
			);

			return add('money', -amount);
		}

		attacks: () => {
			return [...player.attacks];
		},

		attackTotal: () => {
			return util.sum(player.attacks);
		},

		addAttack: (amount) => {
			invariant(
				isPositiveInt(amount),
				`Attack amount must be a positive integer (amount=${amount}).`
			);

			return push('attacks', amount);
		},

		setAttacks: (attacks) => {
			attacks.forEach((amount, index) => {
				invariant(isPositiveInt(amount), `Attack amount must be a positive integer (index=${index}, amount=${amount}).`);
			});

			const c = copy();
			c.attacks = [...attacks];
			return c;
		},

		emptyAttacks: () => {
			const c = copy();
			c.attacks = [];
			return c;
		},

		addCardsToDrawPile: (cards) => {
			return concat('cardsInDrawPile', cards);
		},

		drawCards: (amount) => {
			invariant(
				isPositiveInt(amount),
				`Draw card amount must be a positive integer (amount=${amount}).`);
			);

			const c = copy();
			
			while (amount--) {
				if (c.cardsInDrawPile.length === 0) {
					invariant(
						c.cardsInDiscardPile.length,
						`Can not complete the draw card operation, because both the draw and discard piles are empty.`)
					);

					c.cardsInDrawPile = util.shuffle(c.cardsInDiscardPile);
					c.cardsInDiscardPile = [];
				}

				c.cardsInHand.push(c.cardsInDrawPile.pop());
			}

			return c;
		},

		playCard: (card) => {
			const c = copy();
			const index = c.cardsInHand.indexOf(card);

			invariant(
				index !== -1,
				`Did not find the card in hand.`
			);

			c.cardsInHand.splice(index, 1);
			c.cardsInPlay.push(card);

			return c;
		},

		discardFromHand: (cards) => {
			const c = copy();

			cards.forEach((card) => {
				const index = c.cardsInHand.indexOf(card);
				invariant(
					index !== -1,
					`Did not find one of the cards that should be discarded from hand.`
				);

				c.cardsInHand.splice(index, 1);
				c.cardsInDiscardPile.push(card);
			});

			return c;
		},

		discardFromActive: (cards) => {
			const c = copy();

			cards.forEach((card) => {
				const index = c.cardsInActive.indexOf(card);
				invariant(
					index !== -1,
					`Did not find one of the cards that should be discarded from active.`
				);

				c.cardsInActive.splice(index, 1);
				c.cardsInDiscardPile.push(card);
			});

			return c;
		},

		cardsInDrawPile: () => {
			return [...player.cardsInDrawPile];
		},

		cardsInDiscardPile: () => {
			return [...player.cardsInDiscardPile];
		},

		cardsInActive: () => {
			return [...player.cardsInActive];
		},

		cardsInHand: () => {
			return [...player.cardsInHand];
		}
	};
};