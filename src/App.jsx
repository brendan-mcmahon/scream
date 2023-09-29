import "./App.scss";
import Setup from "./setupCards";
import { EventCards } from "./EventCards";
import { CharacterCards } from "./CharacterCards";
import useLocalStorage from "./useLocalStorage";
import { startEvent } from "./startEvent";
import { NewGameModal } from "./NewGameModal";
import { useState } from "react";

const defaultPrimaryKillerCount = 4;
const defaultSecondaryKillerCount = 3;
const defaultCharacterCount = 7;

const game = Setup(defaultPrimaryKillerCount, defaultSecondaryKillerCount, defaultCharacterCount);

function App() {
  const characterDecks = useLocalStorage("characterDecks", game.characterDecks);
  const victimDeck = useLocalStorage("victimDeck", game.victimDeck);
  const gamePhase = useLocalStorage("gamePhase", "choose");
  const selectedCharacterIndices = useLocalStorage("selectedCharacterIndices", []);
  const eventCards = useLocalStorage("eventCards", []);
  const accumulatedCards = useLocalStorage("accumulatedCards", []);
  const [newGameModal, setNewGameModal] = useState(false);
  const onEventStart = () => startEvent(gamePhase, characterDecks, selectedCharacterIndices, victimDeck, eventCards);

  const startNewGame = (primaryKillerCount, secondaryKillerCount, characterCount) => {
    const newGame = Setup(primaryKillerCount, secondaryKillerCount, characterCount);

    characterDecks.set(newGame.characterDecks);
    victimDeck.set(newGame.victimDeck);

    gamePhase.set("choose");
    selectedCharacterIndices.set([]);
    eventCards.set([]);
    accumulatedCards.set([]);

    setNewGameModal(false);
  };

  const endEvent = () => {
    console.log(eventCards.get);
    accumulatedCards.set((c) => [...c, ...eventCards.get.filter((c) => c.content !== "Kill")]);
    gamePhase.set("choose");

    eventCards.set([]);
    selectedCharacterIndices.set([]);
  };

  const onCharacterSelect = (i) => {
    if (gamePhase.get !== "choose") return;

    if (selectedCharacterIndices.get.some((index) => index === i)) {
      selectedCharacterIndices.set((c) => c.filter((index) => index !== i));
    } else {
      selectedCharacterIndices.set((c) => [...c, i]);
    }
  };

  const eventDisabled =
    gamePhase.get !== "choose" ||
    characterDecks.get.filter((d) => d.status !== "dead").length === 2 ||
    selectedCharacterIndices.get.length < 1;

  return (
    <div className="App">
      <CharacterCards
        characterDecks={characterDecks.get}
        selectedIndices={selectedCharacterIndices.get}
        onCharacterSelect={onCharacterSelect}
      />

      <EventCards eventCards={eventCards.get} />

      <div className="accumulated-cards">
        <div className="card">A: {accumulatedCards.get.filter((c) => c.content === "A").length}</div>
        <div className="card">B: {accumulatedCards.get.filter((c) => c.content === "B").length}</div>
        <div className="card">C: {accumulatedCards.get.filter((c) => c.content === "C").length}</div>
      </div>

      <div className="buttons">
        {gamePhase.get == "choose" && (
          <button disabled={eventDisabled} onClick={onEventStart}>
            Start Event
          </button>
        )}
        {gamePhase.get === "event" && <button onClick={endEvent}>End Event</button>}
        <button onClick={() => setNewGameModal(true)}>New Game</button>
      </div>

      {newGameModal && <NewGameModal startNewGame={startNewGame} close={() => setNewGameModal(false)}></NewGameModal>}
    </div>
  );
}

export default App;
