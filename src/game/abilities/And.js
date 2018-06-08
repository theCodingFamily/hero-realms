export default (abilities) => {
	return {
		execute: () => {
			return new Promise((resolve) => {
				let i = 0;

				function next () {
					if (i < abilities.length) {
						abilities[i++].execute().then(next);
					} else {
						resolve();
					}
				}

				next();
			});
		},

		abilities: () => {
			return [...abilities];
		},

		text: () => {
			return abilities.map((ability) => {
				return ability.text();
			}).join('\n');
		}
	};
};