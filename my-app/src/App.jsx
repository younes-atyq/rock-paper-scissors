import { useState } from "react";
import Header from "./components/Header";
import Rules from "./components/Rules";
import Bonus from "./pages/Bonus";
import GameContext from "./js/GameContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Original from "./pages/Original";

function App() {
  const [game, setGame] = useState({
    score:
      localStorage.getItem("save") === "true"
        ? +localStorage.getItem("score")
        : 0,
    state: null,
    userCard: null,
    botCard: null,
    bonusMode: window.location.pathname === "/bonus" ? true : false,
    start: false,
    save: localStorage.getItem("save") === "true" ? true : false,
  });
  const value = { game, setGame };
  return (
    <Router>
      <div id="main-page" className="container">
        <GameContext.Provider value={value}>
          <Header />
          <Routes>
            <Route path="/bonus" element={<Bonus />} />
            <Route path="/original" element={<Original />} />
            <Route path="/" element={<Original />} />
          </Routes>
          <Rules />
        </GameContext.Provider>
      </div>
    </Router>
  );
}

export default App;
