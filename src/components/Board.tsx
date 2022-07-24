import React from "react";
import { useBoardContext } from "../context/BoardContext";
import { Cell } from "./Cell";

export const Board = () => {
  const { board } = useBoardContext();

  return (
    <div className="board">
      {board.map((row, i) => (
        <div className="row" key={i}>
          {row.map((cell, j) => (
            <Cell {...cell} key={Date.now() + j} />
          ))}
        </div>
      ))}
    </div>
  );
};
