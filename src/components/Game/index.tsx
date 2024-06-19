"use client";
import { useState } from "react";

import { useSearchParams } from "next/navigation";
import { move } from "@/utils";
import { DifficultyType, GamePositionStatus } from "@/@types/index";

const newGameGrid: Array<Array<GamePositionStatus>> = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

export default function Game() {
  const params = useSearchParams();
  const difficulty = params.get("difficulty") as DifficultyType;

  const [gameGrid, setGameGrid] = useState(newGameGrid);

  function handlePlayerMove(row: number, column: number) {
    setGameGrid(
      move(gameGrid, "player", { row: row, column: column }, difficulty)
    );
  }

  return (
    <div className="w-full max-w-3xl aspect-square grid grid-cols-3">
      {gameGrid.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`border border-black w-full h-full flex items-center justify-center
              ${rowIndex === 0 ? "border-t-0" : ""}
              ${colIndex === 0 ? "border-l-0" : ""}
              ${rowIndex === gameGrid.length - 1 ? "border-b-0" : ""}
              ${colIndex === row.length - 1 ? "border-r-0" : ""}
            `}
          >
            {col}
          </div>
        ))
      )}
    </div>
  );
}
