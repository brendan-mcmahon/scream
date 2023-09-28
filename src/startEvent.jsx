export const startEvent = (gamePhase, characterDecks, selectedCharacterIndices, victimDeck, eventCards) => {
  gamePhase.set("event");

  const newDecks = [...characterDecks.get];

  const selectedCharacterCards = selectedCharacterIndices.get.map((index) => {
    const deck = { ...characterDecks.get[index] };
    const card = deck.cards[0];
    deck.cards = deck.cards.slice(1);
    return { ...card, deck };
  });

  const hasKillCard = selectedCharacterCards.some((c) => c.content === "Kill");

  if (hasKillCard) {
    const victim = victimDeck.get[0];
    const index = newDecks.findIndex((deck) => deck.name === victim.content);
    newDecks[index] = {
      ...newDecks[index],
      status: "dead",
    };
    victimDeck.set((v) => v.slice(1));
  }

  selectedCharacterIndices.get.forEach((i) => {
    const deck = selectedCharacterCards.find((c) => c.deck.name === newDecks[i].name).deck;
    newDecks[i] = deck;
    if (hasKillCard) {
      newDecks[i].suspicion++;
    } else {
      newDecks[i].trust++;
    }
  });
  console.log("setting character decks", newDecks);
  characterDecks.set(newDecks);
  eventCards.set(selectedCharacterCards);
};
