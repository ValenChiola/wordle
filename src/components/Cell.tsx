import React from "react";
import { Cell as ICell } from "../interfaces/board";

export const Cell = ({ letter, status }: ICell) => (
  <div className="letter" id={`${status ?? ""}`}>
    {letter}
  </div>
);
