import { useContext, useRef } from "react";
import GameContext from "../js/GameContext";
import randomColor from "../js/randomColor";

export default function Rules() {
  const rules = useRef();
  const overlay = useRef();
  const { game } = useContext(GameContext);

  const closeRules = () => {
    rules.current ? (rules.current.style.display = "none") : null;
    overlay.current ? (overlay.current.style.display = "none") : null;
  };
  const openRules = () => {
    rules.current.style.display = "grid";
    overlay.current.style.display = "block";
  };
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Tab") closeRules();
  });
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("overlay")) closeRules();
  });
  return (
    <div className="rules-btn-wrapper">
      <div ref={rules} id="rules">
        <h2>RULES</h2>
        <button id="close" onClick={closeRules}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <path
              fill="#3B4262"
              d="M16.97 0l2.122 2.121-7.425 7.425 7.425 7.425-2.121 2.12-7.425-7.424-7.425 7.425L0 16.97l7.425-7.425L0 2.121 2.121 0l7.425 7.425L16.971 0z"
            />
          </svg>
        </button>
        {game.bonusMode ? (
          <img src="./images/image-rules-bonus.svg" alt="rules" />
        ) : (
          <img src="./images/image-rules.svg" alt="rules" />
        )}
      </div>
      <div ref={overlay} className="overlay"></div>
      <button
        title="Rules"
        id="rules-btn"
        onClick={openRules}
        style={{ "--random-color": randomColor }}
      >
        RULES
      </button>
    </div>
  );
}
