export const startEvent = (gamePhase, characterDecks, selectedCharacterIndices, victimDeck, eventCards) => {
  gamePhase.set("event");

  const newDecks = [...characterDecks.get];

  const selectedCharacterCards = selectedCharacterIndices.get.map((index) => newDecks[index].cards.shift());

  console.log(selectedCharacterCards.map((c) => c.content));
  console.log(newDecks);

  const hasKillCard = selectedCharacterCards.some((c) => c.content === "Kill");

  if (hasKillCard) {
    console.log("has kill card");
    const victim = victimDeck.get[0];
    console.log(victim.content);
    console.log(newDecks.map((d) => d.name));
    const index = newDecks.findIndex((deck) => deck.name === victim.content);
    console.log(index);
    newDecks[index] = {
      ...newDecks[index],
      status: "dead",
    };
    victimDeck.set((v) => v.slice(1));
  }

  selectedCharacterIndices.get.forEach((i) => {
    if (hasKillCard) {
      newDecks[i].suspicion++;
    } else {
      newDecks[i].trust++;
    }
  });
  characterDecks.set(newDecks);
  eventCards.set(selectedCharacterCards);
};
