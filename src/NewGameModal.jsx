import useNumberInput from "./useNumberInput";

export function NewGameModal(props) {
  const [primaryKillerCount, setPrimaryKillerCount] = useNumberInput(4);
  const [secondaryKillerCount, setSecondaryKillerCount] = useNumberInput(3);
  const [characterCount, setCharacterCount] = useNumberInput(7);

  return (
    <div className="new-game-modal-container">
      <div className="new-game-modal">
        <h2>New Game</h2>
        <div className="form">
          {/* PrimaryKillerCount, SecondaryKillerCount, characterCount */}
          <div className="input-group">
            <label>
              Kill Cards <span>(Primary)</span>
            </label>
            <input type="number" value={primaryKillerCount} onChange={setPrimaryKillerCount} />
          </div>
          <div className="input-group">
            <label>
              Kill Cards <span>(Secondary)</span>
            </label>
            <input type="number" value={secondaryKillerCount} onChange={setSecondaryKillerCount} />
          </div>
          <div className="input-group">
            <label>Characters</label>
            <input type="number" value={characterCount} onChange={setCharacterCount} />
          </div>
          <div className="new-game-modal-buttons">
            <button onClick={() => props.close()}>Cancel</button>
            <button onClick={() => props.startNewGame(primaryKillerCount, secondaryKillerCount, characterCount)}>
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
