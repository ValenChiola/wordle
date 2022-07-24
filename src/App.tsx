import React, { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { useBoardContext } from "./context/BoardContext";
import { useWord } from "./hooks/useWord";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [won, setWon] = useState(false);
  const [lose, setLose] = useState(false);
  const [word] = useWord();
  const { drawLetter, deleteLetter, enter, checkWon, checkLose } =
    useBoardContext();

  useEffect(() => {
    const handleKeyDown = ({ key }: globalThis.KeyboardEvent) => {
      if (key === "Backspace") deleteLetter();
      else if (key === "Enter") {
        const couldPressEnter = enter(word);
        if (couldPressEnter) {
          setWon(checkWon());
          setLose(checkLose());
        }
      } else drawLetter(key.toUpperCase());
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawLetter, deleteLetter, enter, word, checkWon, checkLose]);

  return (
    <div className="App">
      {won ? (
        <div>
          <h1>You Won! :)</h1>
          <button onClick={() => window.location.reload()}>Reset</button>
        </div>
      ) : (
        <>
          {lose ? (
            <div>
              <h1>You Lose :(</h1>
              <h3>The word was: {word}</h3>
              <button onClick={() => window.location.reload()}>Reset</button>
            </div>
          ) : (
            <div>
              <div style={{ padding: "0.5em 0" }}>
                <button onClick={() => setIsVisible((prev) => !prev)}>
                  {isVisible ? "Hide" : "Show"} word
                </button>
                <button onClick={() => window.location.reload()}>Reset</button>
              </div>
              {isVisible && <span>{word}</span>}
              <div className="game">
                <Board />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
