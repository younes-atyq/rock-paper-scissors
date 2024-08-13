import { useEffect, useRef, useState } from "react";
import logic from "../js/logic";
import { useContext } from "react";
import ScoreContext from "../js/ScoreContext";
import allCards from "../js/allCards";
import types from "prop-types";

export default function Card(props) {
  const { selectedCard } = props;
  const botCard = useRef(null);
  const { score, setScore } = useContext(ScoreContext);
  const [isWin, setIsWin] = useState(false);

  const checkGame = () => {
    const card1 = selectedCard;
    const card2 = botCard.current.alt;

    const result = logic(card1, card2);
    setIsWin(result < 0);

    const scoreResult = score.score + result < 0 ? 0 : score.score + result;
    const stateResult =
      result < 0 ? "YOU LOSE" : result === 0 ? "DRAW" : "YOU WIN";

    setScore({
      score: scoreResult,
      state: stateResult,
      userCard: card1,
      botCard: card2,
    });
  };

  useEffect(() => {
    const card = botCard.current;
    const cardChanger = () => {
      const randomCard = allCards[Math.floor(Math.random() * 5)];
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

Card.propTypes = {
  selectedCard: types.string.isRequired,
};
