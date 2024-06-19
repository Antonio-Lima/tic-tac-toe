import { DifficultyType, GamePositionStatus } from "@/@types";

export function checkWin(grid: Array<Array<GamePositionStatus>>): boolean {
  return true;
}

type MoveType = {
  row: GamePositionStatus;
  column: GamePositionStatus;
};

export function move(
  grid: Array<Array<GamePositionStatus>>,
  who: "bot" | "player",
  move: MoveType,
  difficulty: DifficultyType
): Array<Array<GamePositionStatus>> {
  let newGrid = grid;
  switch (who) {
    case "bot":
      break;
    case "player":
      newGrid[move.row][move.column] = GamePositionStatus.Player;
      break;
  }
  return newGrid;
}
