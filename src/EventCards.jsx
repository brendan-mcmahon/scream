import { shuffle } from "./shuffle";

export function EventCards(props) {
  return (
    <div className="event-cards">
      {shuffle(props.eventCards).map((card, index) => (
        <div key={index} className="card event-card">
          <h2>{card.content}</h2>
        </div>
      ))}
    </div>
  );
}
