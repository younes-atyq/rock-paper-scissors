import { useContext } from "react";
import ScoreContext from "../js/ScoreContext";

export default function Header() {
  const { score } = useContext(ScoreContext);
  return (
    <header className="header">
      <div className="card-names">
        <span>Rock</span>
        <span>Paper</span>
        <span>Scissors</span>
        <span>Lizard</span>
        <span>Spock</span>
      </div>
      <div className="score">
        <span id="score-text">SCORE</span>
        <span id="score">{score.score}</span>
      </div>
    </header>
  );
}
