import { shuffle } from "./shuffle";


const characterCards = [
  { content: "Billy", type: "Character" },
  { content: "Neil", type: "Character" },
  { content: "Stu", type: "Character" },
  { content: "Gale", type: "Character" },
  { content: "Dewey", type: "Character" },
  { content: "Randy", type: "Character" },
  { content: "Himbry", type: "Character" },
  { content: "Tatum", type: "Character" },
  { content: "Casey", type: "Character" },
  { content: "Stuart", type: "Character" },
  { content: "Kenny", type: "Character" },
  { content: "Cotton", type: "Character" },
  { content: "Burke", type: "Character" },
];

const assembleCharacterDecks = (characterCount) => {
  return characterCards.slice(0, characterCount).map(() => {
    const cards = [
      { content: "A", type: "Action" },
      { content: "A", type: "Action" },
      { content: "A", type: "Action" },
      { content: "B", type: "Action" },
      { content: "B", type: "Action" },
      { content: "C", type: "Action" },
    ];
    return shuffle(cards);
  });
};

const loadKillCards = (deck, count) => 
    shuffle(deck.fill({ content: "Kill", type: "Action" }, deck.length - count, deck.length));

const addIdCard = (deck, content) => {
  deck.push({ content, type: "Id" });
};

const addIdCards = (killerDecks, characterDecks) => {
  addIdCard(killerDecks[0], "Killer");
  addIdCard(killerDecks[1], "Killer");

  characterDecks.forEach((deck) => addIdCard(deck, "Friend"));
};

const buildCharacterVictimPairs = (characterCount) =>
  shuffle(
    characterCards.slice(0, characterCount).map((character) => ({
      character,
      victim: { content: character.content, type: "Victim" },
    }))
  );

const addCharacterCardsToDecks = (characterDecks, killerDecks, characterVictimPairs) => {
  characterDecks.forEach((deck) => {
    const pair = characterVictimPairs.shift();
    deck.unshift(pair.victim, pair.character);
  });

  killerDecks.forEach((deck) => {
    const pair = characterVictimPairs.shift();
    deck.unshift(pair.victim, pair.character);
  });
};

const throwAwayTopCard = (decks) => {
  decks.forEach((deck) => deck.shift());
};

const createVictimDeck = (characterDecks) => {
  return shuffle(characterDecks.map((deck) => deck.shift()));
};

export default function Setup(PrimaryKillerCount, SecondaryKillerCount, characterCount) {
  const characterDecks = assembleCharacterDecks(characterCount);

  const killerDecks = characterDecks.splice(0, 2);

  killerDecks[0] = loadKillCards(killerDecks[0], PrimaryKillerCount);
  killerDecks[1] = loadKillCards(killerDecks[1], SecondaryKillerCount);

  addIdCards(killerDecks, characterDecks);

  const characterVictimPairs = buildCharacterVictimPairs(characterCount);

  addCharacterCardsToDecks(characterDecks, killerDecks, characterVictimPairs);

  throwAwayTopCard(killerDecks);
  const victimDeck = createVictimDeck(characterDecks);

  const envelopes = shuffle([...characterDecks, ...killerDecks]);

  const characterDecksWithNames = envelopes.map((deck) => ({
    name: deck[0].content,
    suspicion: 0,
    trust: 0,
    cards: deck.filter((card) => card.type === "Action"),
    status: "alive"
  }));

  return { characterDecks: characterDecksWithNames, victimDeck };
}
