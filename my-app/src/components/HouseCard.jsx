import { useEffect, useRef, useState } from "react";
import logic from "../js/logic";
import { useContext } from "react";
import GameContext from "../js/GameContext";
import allCards from "../js/allCards";
import types from "prop-types";

const originalCards = allCards.filter((card) => card.mode === "original");

export default function HouseCard(props) {
  const { selectedCard } = props;
  const botCard = useRef(null);
  const { game, setGame } = useContext(GameContext);
  const [isWin, setIsWin] = useState(false);

  const checkGame = () => {
    const card1 = selectedCard;
    const card2 = botCard.current.alt;

    const result = logic(card1, card2);
    setIsWin(result < 0);

    const scoreResult = game.score + result < 0 ? 0 : game.score + result;
    const stateResult =
      result < 0 ? "YOU LOSE" : result === 0 ? "DRAW" : "YOU WIN";

    if (game.save) localStorage.setItem("score", scoreResult);

    setGame({
      ...game,
      score: scoreResult,
      state: stateResult,
      userCard: card1,
      botCard: card2,
      start: false,
    });
  };

  useEffect(() => {
    setGame({
      ...game,
      start: true,
    });
    const card = botCard.current;
    const cardChanger = () => {
      const randomCard = (game.bonusMode ? allCards : originalCards)[
        Math.floor(Math.random() * (game.bonusMode ? 5 : 3))
      ];
      card.src = randomCard.img;
      card.alt = randomCard.name;
      card.parentElement.style = `--color: ${randomCard.color};`;
    };

    const changeCard1 = setInterval(cardChanger, 50);
    let changeCard2;

    const controls = setTimeout(() => {
      clearInterval(changeCard1);
      changeCard2 = setInterval(cardChanger, 350);

      setTimeout(() => {
        clearInterval(changeCard2);
        setTimeout(() => {
          cardChanger();
          checkGame();
        }, 100);
      }, 500);
    }, 1000);

    return () => {
      clearTimeout(controls);
      clearInterval(changeCard1);
      clearInterval(changeCard2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <button tabIndex={-1} id="bot" className={`card bot ${isWin ? "win" : ""}`}>
      <span className="text">THE HOUSE PICKED</span>
      <img ref={botCard} src={""} alt={""} />
    </button>
  );
}

HouseCard.propTypes = {
  selectedCard: types.string.isRequired,
};
