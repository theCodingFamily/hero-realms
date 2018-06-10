import Game from 'game/game/Game';
import GameTypes from 'game/constants/GameTypes';
import util from 'utils/util';

const shuffle = util.shuffle;
const invariant = util.invariant;

export default (gameType) => {
	invariant(
		gameType === GameTypes.OneVsOne,
		`Only the One VS One game type is supported.`
	);

	const _builder = {};
	let _players = [];
	let _shuffle = false;

	_builder.add = (player) => {
		_players.push(player);

		invariant(
			_players.length <= 2,
			`One VS One games can only have two players.`
		);

		return _builder;
	};

	_builder.shufflePlayers = (shuffle) {
		invariant(
			shuffle === true || shuffle === false,
			`You must provide a boolean value.`
		);
		_shuffle = shuffle;
		return _builder;
	};

	_builder.build = () => {
		invariant(
			_players.length === 2,
			`There must be two players in a One VS One game.`
		);

		if (_shuffle) {
			_players = shuffle(_players);
		}

		return Game(_players);
	};

	return _builder;
};