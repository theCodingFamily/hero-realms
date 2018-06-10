import util from 'utils/util';
import Abilities from 'game/constants/Abilities';

import And from 'game/abilities/And';
import Attack from 'game/abilities/Attack';
import Draw from 'game/abilities/Draw';
import DrawThenDiscard from 'game/abilities/DrawThenDiscard';
import Gold from 'game/abilities/Gold';
import Life from 'game/abilities/Life';
import MayDrawThenDiscard from 'game/abilities/MayDrawThenDiscard';
import Or from 'game/abilities/Or';
import Sacrifice from 'game/abilities/Sacrifice';

function build (creator) {
	const args = Array.prototype.slice.call(arguments, 1);

	return creator.apply(null, args);
}

function valueBuilder (creator) {
	let _value = null;
	const _api = {};

	_api.value = (value) => {
		if (value == null) {
			throw new Error(`Can not assign a null or undefined value.`);
		}
		_value = value;
		return _api;
	};

	_api.build = () => {
		if (_value == null) {
			throw new Error(`You must assign a value (use .value(v)) before calling build().`);
		}

		return build(creator, _value);
	};

	return _api;
}

function abilityBuilder (creator) {
	const _builders = [];
	const _api = {};

	_api.add = (builder) => {
		if (builder == null) {
			throw new Error(`Can not add a null or undefined value.`);
		}

		if (!util.isFunction(builder.build)) {
			throw new Error(`The 'builder' object must have a 'build' method.`);
		}

		_builders.push(builder);
		return _api;
	};

	_api.build = () => {
		const abilities = _builders.map((builder) => {
			return builder.build();
		});

		return build(creator, abilities);
	};

	return _api;
}

const map = {
	[Abilities.And]: () => abilityBuilder(And),
	[Abilities.Attack]: () => valueBuilder(Attack),
	[Abilities.Draw]: () => valueBuilder(Draw),
	[Abilities.DrawThenDiscard]: () => valueBuilder(DrawThenDiscard),
	[Abilities.Gold]: () => valueBuilder(Gold),
	[Abilities.Life]: () => valueBuilder(Life),
	[Abilities.MayDrawThenDiscard]: () => valueBuilder(MayDrawThenDiscard),
	[Abilities.Or]: () => abilityBuilder(Or),
	[Abilities.Sacrifice]: () => valueBuilder(Sacrifice)
};

export default function (key) {
	if (map[key]) {
		return map[key]();
	}

	throw new Error(`Unknown ability type key (key=${key}).`);
};