import { DifficultyType, GamePositionStatus, ResultType } from "@/@types";

export function gameStatus(
  grid: Array<Array<GamePositionStatus>>
): ResultType | "" {
  if (checkWin(grid, GamePositionStatus.Player)) return "player";
  if (checkWin(grid, GamePositionStatus.Bot)) return "bot";
  if (
    grid.every((row) => row.every((cell) => cell !== GamePositionStatus.Empty))
  )
    return "draw";
  return "";
}

function checkWin(
  grid: Array<Array<GamePositionStatus>>,
  player: GamePositionStatus
): boolean {
  for (let i = 0; i < 3; i++) {
    if (
      (grid[i][0] === player &&
        grid[i][1] === player &&
        grid[i][2] === player) ||
      (grid[0][i] === player && grid[1][i] === player && grid[2][i] === player)
    ) {
      return true;
    }
  }
  if (
    (grid[0][0] === player && grid[1][1] === player && grid[2][2] === player) ||
    (grid[0][2] === player && grid[1][1] === player && grid[2][0] === player)
  ) {
    return true;
  }
  return false;
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
  const newGrid = grid.map((row) => row.slice());
  if (who === "player")
    newGrid[move.row][move.column] = GamePositionStatus.Player;
  else {
    const botMove = computerMove(newGrid, difficulty);
    if (botMove) newGrid[botMove.row][botMove.column] = GamePositionStatus.Bot;
  }
  return newGrid;
}

function computerMove(
  grid: Array<Array<GamePositionStatus>>,
  difficulty: DifficultyType
): MoveType | null {
  switch (difficulty) {
    case "easy":
      return easyMove(grid);
    case "medium":
      return mediumMove(grid);
    case "hard":
      return hardMove(grid);
    default:
      return easyMove(grid);
  }
}

function easyMove(grid: Array<Array<GamePositionStatus>>): MoveType | null {
  const availableMoves: MoveType[] = [];
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell === GamePositionStatus.Empty) {
        availableMoves.push({ row: rowIndex, column: cellIndex });
      }
    });
  });
  if (availableMoves.length === 0) return null;
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function mediumMove(grid: Array<Array<GamePositionStatus>>): MoveType | null {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row][col] === GamePositionStatus.Empty) {
        grid[row][col] = GamePositionStatus.Bot;
        if (checkWin(grid, GamePositionStatus.Bot)) {
          return { row, column: col };
        }
        grid[row][col] = GamePositionStatus.Empty;
      }
    }
  }

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row][col] === GamePositionStatus.Empty) {
        grid[row][col] = GamePositionStatus.Player;
        if (checkWin(grid, GamePositionStatus.Player)) {
          return { row, column: col };
        }
        grid[row][col] = GamePositionStatus.Empty;
      }
    }
  }

  return easyMove(grid);
}

function hardMove(grid: Array<Array<GamePositionStatus>>): MoveType | null {
  let bestMove: MoveType | null = null;
  let bestValue = -Infinity;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row][col] === GamePositionStatus.Empty) {
        grid[row][col] = GamePositionStatus.Bot;
        const moveValue = minimax(grid, 0, false);
        grid[row][col] = GamePositionStatus.Empty;
        if (moveValue > bestValue) {
          bestMove = { row, column: col };
          bestValue = moveValue;
        }
      }
    }
  }

  return bestMove;
}

function minimax(
  grid: Array<Array<GamePositionStatus>>,
  depth: number,
  isMaximizing: boolean
): number {
  const score = evaluate(grid);
  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (grid.flat().every((cell) => cell !== GamePositionStatus.Empty)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (grid[row][col] === GamePositionStatus.Empty) {
          grid[row][col] = GamePositionStatus.Bot;
          best = Math.max(best, minimax(grid, depth + 1, false));
          grid[row][col] = GamePositionStatus.Empty;
        }
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (grid[row][col] === GamePositionStatus.Empty) {
          grid[row][col] = GamePositionStatus.Player;
          best = Math.min(best, minimax(grid, depth + 1, true));
          grid[row][col] = GamePositionStatus.Empty;
        }
      }
    }
    return best;
  }
}

function evaluate(grid: Array<Array<GamePositionStatus>>): number {
  if (checkWin(grid, GamePositionStatus.Bot)) return 10;
  if (checkWin(grid, GamePositionStatus.Player)) return -10;
  return 0;
}
