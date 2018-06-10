import util from 'utils/util';

export default () => {
	const _builder = {};
	let _shuffle = false;
	let _cards = [];

	_builder.add = (card) => {
		_cards.push(card);
		return _builder;
	};

	_builder.shuffle = (shuffle) => {
		_shuffle = !!shuffle;
		return _builder;
	};

	_builder.build = () => {
		if (_shuffle) {
			_cards = util.shuffle(_cards);
		}

		return Deck(_cards);
	};


	return _builder;
};