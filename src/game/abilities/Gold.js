export default (value) => {
	return {
		execute: () => {
			return Promise.resolve();
		},

		value: () => {
			return value;
		},

		text: () => {
			return `Gain ${value} gold.`;
		}
	};
};