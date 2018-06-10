import Market from 'game/market/Market';
import util from 'utils/util';

const invariant = util.invariant;

export default () => {
	const _builder = {};
	let _deck;
	let _fireGemsCount = 20;
	let _size = 5;

	_builder.deck = (deck) => {
		_deck = deck;
		return _builder;
	};

	_builder.fireGems = (amount) => {
		invariant(
			Number.isInteger(amount),
			`Fire gem amount must be an integer >= 0.`
		);

		_fireGemsCount = amount;
	};

	_builder.size = (size) => {
		invariant(
			Number.isInteger(size),
			`The market size must be a positive integer.`
		);
	};

	_builder.build = () => {
		return Market(_deck, _fireGemsCount, _size);
	};

	return _builder;
};