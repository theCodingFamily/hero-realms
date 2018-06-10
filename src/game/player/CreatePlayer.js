import Player from 'game/player/Player';

export default () => {
	let _role;
	let _name;

	const builder = {
		name: (name) => {
			_name = name;
			return builder;
		},

		role: (role) => {
			_role = role;
			return builder;
		},

		build: () => {
			return Player({
				name: _name,
				role: _role
			});
		}
	};
};