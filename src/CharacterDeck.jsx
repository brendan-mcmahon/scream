import { deadIcon } from "./deadIcon";

export function CharacterDeck({ deck, selected, onSelect }) {
  const stats = (
    <div className="stats">
      <div>
        <label>Suspicion:</label> {deck.suspicion}
      </div>
      <div>
        <label>Trust:</label> {deck.trust}
      </div>
      <div>
        <label>Cards:</label> {deck.cards.length}
      </div>
    </div>
  );

  const onSelected = () => {
    if (deck.status === "dead") return;
    onSelect();
  };

  return (
    <div className={`deck card ${deck.status} ${selected ? "selected" : ""}`} onClick={onSelected}>
      <p className="name">{deck.name}</p>
      {deck.status === "alive" ? stats : deadIcon()}
    </div>
  );
}
