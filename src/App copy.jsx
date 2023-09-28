import { useState, useEffect } from "react";
import "./App.scss";
import Setup from "./setupCards";
import { CharacterDeck } from "./CharacterDeck";

function App() {
  const [characterDecks, setCharacterDecks] = useState([]);
  const [victimDeck, setVictimDeck] = useState([]);
  const [radius, setRadius] = useState(Math.min(window.innerWidth, window.innerHeight) / 3);
  const [gamePhase, setGamePhase] = useState("choose");
  const [selectedCharacterIndices, setSelectedCharacterIndices] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setRadius(Math.min(window.innerWidth, window.innerHeight) / 3);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const diameter = 2 * radius;
  const centerX = radius;
  const centerY = radius;

  useEffect(() => {
    const game = Setup();
    setCharacterDecks(game.characterDecks);
    setVictimDeck(game.victimDeck);
  }, []);

  const startEvent = () => {
    // take the top card from each character in the selectedCharacterIndices
    // display them
    // if there is a card with content "Kill", flip over the top Victim card too

    const selectedCharacterDecks = selectedCharacterIndices.map((index) => characterDecks[index]);
    console.log(selectedCharacterDecks);
  };

  const onCharacterSelect = (i) => {
    console.log("onCharacterSelect", i);
    if (selectedCharacterIndices.some((index) => index === i)) {
      setSelectedCharacterIndices((c) => c.filter((index) => index !== i));
    } else {
      setSelectedCharacterIndices((c) => [...c, i]);
    }
  };

  return (
    <div className="App">
      <div className="characters" style={{ width: diameter, height: diameter }}>
        {characterDecks.map((deck, index) => {
          const angle = (index / characterDecks.length) * (2 * Math.PI);
          const x = centerX + radius * Math.cos(angle) - 15; // 15 is half the width of the child div
          const y = centerY + radius * Math.sin(angle) - 15; // 15 is half the height of the child div

          return (
            <CharacterDeck
              key={index}
              rotation={angle}
              left={x}
              top={y}
              deck={deck}
              selected={selectedCharacterIndices.some((i) => i === index)}
              onSelect={() => onCharacterSelect(index)}
            />
          );
        })}
      </div>
      <button onClick={startEvent}>Start Event</button>

      <pre>{JSON.stringify(selectedCharacterIndices.map((v) => v))}</pre>
      {/* <div className="victim">
        <h2>{victimDeck.name}</h2>
      </div> */}
    </div>
  );
}
