"use client";
import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { gameStatus, move } from "@/utils";
import { DifficultyType, GamePositionStatus } from "@/@types/index";

const newGameGrid: Array<Array<GamePositionStatus>> = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

export default function Game() {
  const params = useSearchParams();
  const difficulty = params.get("difficulty") as DifficultyType;

  const [gameGrid, setGameGrid] = useState([...newGameGrid]);

  const [playerTime, setPlayerTime] = useState(true);

  function handlePlayerMove(row: number, column: number) {
    if (gameGrid[row][column] === 0) {
      setGameGrid(
        move(gameGrid, "player", { row: row, column: column }, difficulty)
      );
      setPlayerTime(false);
    }
  }

  useEffect(() => {
    const winner = gameStatus(gameGrid);
    if (winner) {
      console.log(winner);
    } else {
      if (!playerTime) {
        setGameGrid(move(gameGrid, "bot", { row: 0, column: 0 }, difficulty));
        setPlayerTime(true);
      }
    }
  }, [gameGrid, playerTime, difficulty]);

  return (
    <>
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
              onClick={() => handlePlayerMove(rowIndex, colIndex)}
            >
              <button className="flex w-full h-full justify-center items-center">
                {gameGrid[rowIndex][colIndex] === 1 && <p>x</p>}
                {gameGrid[rowIndex][colIndex] === 2 && <p>o</p>}
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
