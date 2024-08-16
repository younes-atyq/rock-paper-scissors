import { useContext, useEffect, useRef, useState } from "react";
import HouseCard from "../components/HouseCard";
import allCards from "../js/allCards";
import GameContext from "../js/GameContext";
import Card from "../components/Card";

const originalCards = allCards.filter((card) => card.mode === "original");

export default function Original() {
  const cardsRef = useRef();
  const { game, setGame } = useContext(GameContext);
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
    setGame({ ...game, state: null, userCard: null, botCard: null });
  };

  useEffect(() => {
    if (!game.state) return;
    const cardsContainer = cardsRef.current;
    const cards = Array.from(cardsContainer.children);

    cards.forEach((card) => {
      if (card.id === selectedCard) {
        game.state === "YOU WIN" ? card.classList.add("win") : null;
        card.style.gridArea = "selected";
      }
    });

    cardsContainer.style.gridTemplateAreas = ``;
    cardsContainer.classList.add("finish");

    setGameOver(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

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
          if (c.id !== card.id) {
            c.classList.add("hide");
          }
        });
      });
    });
  }, []);

  return (
    <div ref={cardsRef} className="cards original">
      {originalCards.map((card) => (
        <Card key={card.name} {...card} />
      ))}

      {gameStart ? <HouseCard selectedCard={selectedCard} /> : null}
      {gameOver ? (
        <div className="game-over" id="game-over">
          <span>{game.state}</span>
          <button onClick={playAgain}>PLAY AGAIN</button>
        </div>
      ) : null}
    </div>
  );
}
