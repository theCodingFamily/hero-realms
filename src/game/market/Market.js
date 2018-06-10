import FireGem from 'game/cards/FireGem';
import CreateDeck from 'game/deck/CreateDeck';

function createFireGems (count) {
	const builder = CreateDeck();
	for (let i = 0; i < count; i++) {
		builder.add(FireGem());
	}
	return builder.build();
}

export default (deck, fireGemsCount, size) => {
	let _deck = deck;
	let _fireGems = createFireGems(fireGemsCount);
	let _size = size;

	return {}; // TBD - market API
};