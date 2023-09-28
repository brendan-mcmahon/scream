import { CharacterDeck } from "./CharacterDeck";

export function CharacterCards(props) {
  return (
    <div className="characters">
      {props.characterDecks.map((deck, index) => {
        return (
          <CharacterDeck
            key={index}
            deck={deck}
            selected = {props.selectedIndices.some((i) => i === index)}
            onSelect={() => props.onCharacterSelect(index)} />
        );
      })}
    </div>
  );
}
