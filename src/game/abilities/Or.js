export default (abilities) => {
	return {
		execute: () => {
			// TODO: allow this to be an actual choice
			return new Promise((resolve) => {
				if (abilities.length) {
					abilities[0].execute().then(resolve);
				} else {
					resolve();
				}
			});
		},

		abilities: () => {
			return [...abilities];
		},

		text: () => {
			return abilities.map((ability) => {
				return ability.text();
			}).join('\nor\n');
		}
	};
};