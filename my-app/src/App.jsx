import { useState } from "react";
import Header from "./components/Header";
import Rules from "./components/Rules";
import Bonus from "./Bonus";
import ScoreContext from "./js/ScoreContext";

function App() {
  const [score, setScore] = useState({
    score: 0,
    state: null,
    userCard: null,
    botCard: null,
  });
  const value = { score, setScore };
  return (
    <div id="main-page" className="container">
      <ScoreContext.Provider value={value}>
        <Header />
        <Bonus />
        <div className="rules-btn-wrapper">
          <Rules />
        </div>
      </ScoreContext.Provider>
    </div>
  );
}

export default App;
