# Ability Creation

```javascript
const ability = CreateAbility(Abilities.And)
    .add(CreateAbility(Abilities.Attack).value(6))
    .add(CreateAbility(Abilities.Gold).value(3))
    .build();
```

# Card Creation

```javascript
const card = CreateCard(Types.Champion)
    .name('Grak, Storm Giant')
    .faction(Factions.Wild)
    .cost(8)
    .subtypes(Subtypes.Giant)
    .defense(7)
    .guard(true)
    .primary(CreateAbility()
        .add(CreateAbility(Abilities.Attack).value(6))
        .add(CreateAbility(Abilities.MayDrawThenDiscard).value(1))
    )
    .ally(CreateAbility()
        .add(CreateAbility(Abilities.DrawThenDiscard).value(1))
    )
    .build();
```

# Player Creation

```javascript
const player = CreatePlayer()
    .name(`Player One`)
    .role(Roles.None) // eventually, these will include Thief, Warrior, etc
    .build();
```

# Player Actions

```javascript
/* 
Begin the Main Phase.

"api" is a game api object that grants access to all of the game world data
necessary to perform the Main Phase actions.
*/
player.mainPhase(api);
```

#Main Phase Game API

```javascript

api.getCurrentPlayer(); // returns the current player object

api.getOpponentPlayers(); // returns a list of opponent player objects

api.done(); // invoke when the current player is done with the Main Phase

api.getAvailableMarketCards(); // returns a list of the available market cards

api.getAcquirableMarketCards(); // returns a list of the available market cards
                                // that the player can currently afford

api.acquireCardFromMarket(card); // player buys a card from the market

api.getCombatTargets(); // returns a list of available targets
                  // if an opponent player has guards, then only the guards
                  // are returned for that player, otherwise any champions and
                  // the opponent player are returned

api.getDefeatableCombatTargets(); // returns a list of available combat targets
                                  // that the player could defeat with the
                                  // Combat they currently have in their Combat
                                  // Pool; opponent players are also included,
                                  // if the opponent has no guards

api.attackCombatTarget(target); // applies the necessary amount of Combat
                                // from the Combat Pool to defeat the target;
                                // if the target is a player, then applies all
                                // of the Combat from the Combat Pool
```

# ~~deprecated~~
```javascript
// begin main phase
player.mainPhase(done); // invoke "done" callback when done with the main phase

// begin the discard phase
player.discardPhase(done); // invoke "done" callback when done with the discard phase

// begin the draw phase
player.drawPhase(done); // invoke "done" callback when done with the draw phase

// play a card
player.play(card);

// attack
player.attack(target); // target can be an opponents champion or the player

// get the list of available targets
/* ex: If a player has any guards, then only the guards would be returned in the list. If no guards, then the list will include any normal champions and the player.
*/
player.getTargets();

// get gold pool total
player.getGoldPoolTotal();

// get player life
player.getLife();

// get combat pool total
player.getCombatPoolTotal();

// get list of individual available attacks (useful in the Campaign game)
player.getCombatsInPool();
```

# Game Creation

```javascript
const game = Create(GameTypes.OneVsOne)
    .add(CreatePlayer().name('Player One').role(Roles.None))
    .add(CreatePlayer().name('Player Two').role(Roles.None))
    .shufflePlayers(true) // shuffle player order
    .build();
```

# Game Actions

```javascript
/* 
Start the game:
  1. deals out the players
  2. deals out the market
  3. starts play by calling player.mainPhase(done) on the 1st player

Game play continues from here in the following order:
  1. current player performs the following phases
    1. Main Phase
      1. play a card in your hand
      2. use expend, ally, and/or sacrifice abilities of any of your cards in play
      3. use gold to acquire new cards from market
      4. use combat to attack an opponent and/or their champions
    2. Discard Phase
      1. lose any remaining gold in gold pool
      2. lose any remaining combat in combat pool
      3. put all in-play Items and Actions into discard pile
      4. put any remaining cards in hand into discard pile
      5. prepare all of your champions
    3. Draw Phase
      1. draw 5 cards
  
After each action in the main phase, we should evaluate the Win Conditions to see if they are met. If yes, then the game is over and the team that satisified the Win Conditions is declared the winner.
*/
game.start();
```