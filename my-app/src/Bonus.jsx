import { useContext, useEffect, useRef, useState } from "react";
import Card from "./components/Card";
import allCards from "./js/allCards";
import ScoreContext from "./js/ScoreContext";

export default function Bonus() {
  const cardsRef = useRef();
  const { score } = useContext(ScoreContext);
  const [gameStart, setGameStart] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const playAgain = () => {
    const cardsContainer = cardsRef.current;
    const cards = Array.from(cardsContainer.children);

    cards.forEach((card) => {
      card.classList.remove("hide");
      if (card.style.gridArea === "selected") {
        card.classList.remove("active");
        card.classList.remove("win");
        card.style.gridArea = selectedCard;
        card.removeAttribute("tabindex");
      }
    });

    cardsContainer.classList.remove("active");
    cardsContainer.classList.remove("finish");

    setGameStart(false);
    setSelectedCard(null);
    setGameOver(false);
  };

  useEffect(() => {
    if (!score.state) return;
    const cardsContainer = cardsRef.current;
    const cards = Array.from(cardsContainer.children);

    cards.forEach((card) => {
      if (card.id === selectedCard) {
        score.state === "YOU WIN" ? card.classList.add("win") : null;
        card.style.gridArea = "selected";
      }
    });

    cardsContainer.style.gridTemplateAreas = ``;
    cardsContainer.classList.add("finish");

    setGameOver(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  useEffect(() => {
    const cards = Array.from(cardsRef.current.children);

    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        const cardsContainer = e.target.closest(".cards");
        const card = e.target.classList.contains("card")
          ? e.target
          : e.target.closest(".card");
        setSelectedCard(card.id);
        setGameStart(true);

        card.classList.add("active");
        card.setAttribute("tabindex", "-1");

        cardsContainer.classList.add("active");
        cardsContainer.style.gridTemplateAreas = `"${card.id} bot"`;

        cards.forEach((c) => {
          if (c !== card) {
            c.classList.add("hide");
          }
        });
      });
    });
  }, []);

  return (
    <div ref={cardsRef} className="cards">
      {allCards.map((card) => (
        <button
          key={card.name}
          className="card"
          title={card.name}
          id={card.name}
          style={{ "--color": `${card.color}` }}
        >
          <span className="text">YOU PICKED</span>
          <img src={card.img} alt={card.name} />
        </button>
      ))}
      {gameStart ? <Card selectedCard={selectedCard} /> : null}
      {gameOver ? (
        <div className="game-over" id="game-over">
          <span>{score.state}</span>
          <button onClick={playAgain}>PLAY AGAIN</button>
        </div>
      ) : null}
    </div>
  );
}
