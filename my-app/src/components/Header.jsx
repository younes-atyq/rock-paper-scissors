import { useContext } from "react";
import GameContext from "../js/GameContext";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { game, setGame } = useContext(GameContext);
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    setGame({
      ...game,
      state: null,
      botCard: null,
      userCard: null,
      bonusMode: e.target.id === "bonus" ? true : false,
    });
    navigate(`/${e.target.id === "bonus" ? "bonus" : "original"}`);
  };

  const handleSave = () => {
    if (game.start) return;
    localStorage.setItem(
      "save",
      localStorage.getItem("save") === "false" ? "true" : "false"
    );
    setGame({
      ...game,
      save: localStorage.getItem("save") === "true" ? true : false,
    });

    if (localStorage.getItem("save") === "false") {
      localStorage.removeItem("score");
    } else localStorage.setItem("score", game.score);
  };

  return (
    <header id="header">
      <div className="card-names">
        <span>Rock</span>
        <span>Paper</span>
        <span>Scissors</span>
        <span>Lizard</span>
        <span>Spock</span>
      </div>
      {!game.start && (
        <div className="mode">
          <Link
            to="/"
            id="original"
            className={game.bonusMode ? "" : "active"}
            onClick={handleClick}
          >
            ORIGINAL
          </Link>
          <Link
            to={"/"}
            id="bonus"
            className={game.bonusMode ? "active" : ""}
            onClick={handleClick}
          >
            BONUS
          </Link>
        </div>
      )}
      <div className="score" onClick={handleSave}>
        <span id="score-text">SCORE</span>
        <span id="score">{game.score}</span>
        {!game.start &&
          (game.save ? (
            <img className="save" src="./images/lock.svg" />
          ) : (
            // <span>true</span>
            <img className="save" src="./images/unlock.svg" />
            // <span>false</span>
          ))}
      </div>
    </header>
  );
}
