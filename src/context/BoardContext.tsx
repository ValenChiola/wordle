import React, { createContext, ReactNode, useContext, useState } from "react";
import { getNewBoard } from "../helpers/getNewBoard";
import { getStatus } from "../helpers/getStatus";
import { Board } from "../interfaces/board";

const validLetters = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Ñ",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];

const Context = createContext({} as ContextValues);
Context.displayName = "BoardContext";

// Hook
export const useBoardContext = () => useContext(Context);

// HOC
export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState(getNewBoard);
  const [attempt, setAttempt] = useState({
    i: 0,
    j: 0,
  });

  const drawLetter = (letter: string) => {
    const { i, j } = attempt;

    if (!validLetters.includes(letter) || j > 4) return;

    const newBoard = [...board];
    newBoard[i][j] = {
      letter,
    };
    setBoard(newBoard);

    setAttempt({
      i,
      j: j + 1,
    });
  };

  const deleteLetter = () => {
    const { i, j } = attempt;

    if (j < 1) return;

    const newBoard = [...board];
    newBoard[i][j - 1] = {
      letter: "",
    };
    setBoard(newBoard);

    setAttempt({
      i,
      j: j - 1,
    });
  };

  const enter = (word: string) => {
    const { i, j } = attempt;

    if (j !== 5) return false;

    const newBoard = [...board];

    for (let k = 0; k < 5; k++) {
      const { letter } = newBoard[i][k];
      newBoard[i][k] = {
        letter,
        status: getStatus(word, letter, k),
      };
    }

    setBoard(newBoard);

    setAttempt({
      i: i + 1,
      j: 0,
    });

    return true;
  };

  const checkWon = () =>
    board[attempt.i].every(({ status }) => status === "correct");

  const checkLose = () => attempt.i === 4;

  return (
    <Context.Provider
      value={{ board, drawLetter, deleteLetter, enter, checkWon, checkLose }}
    >
      {children}
    </Context.Provider>
  );
};

// Interfaces
interface ContextValues {
  board: Board;
  drawLetter: Function;
  deleteLetter: Function;
  enter: Function;
  checkWon: Function;
  checkLose: Function;
}
