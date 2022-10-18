import { useState, useEffect } from "react";
import useBoard, { VECTORS } from "../../hooks/useBoard";

import ScoreCard from "../ScoreCard";
import Cell from "../Cell";

import Style from "./index.style";
import Toolbar from "../Toolbar";

const LEVELS = {
  BEGINNER: {
    ROW: 9,
    COL: 9,
    BOMBS: 10,
  },
  INTERMEDIATE: {
    ROW: 16,
    COL: 16,
    BOMBS: 40,
  },
  EXPERT: {
    ROW: 16,
    COL: 30,
    BOMBS: 99,
  },
};

function Minesweeper() {
  const [gameLevel, setGameLevel] = useState(LEVELS.EXPERT);
  const [mineLoctions, setMineLocations] = useState<any>([]);
  const [grid, setGrid] = useState<any>([]);
  const Board = useBoard();

  const [noOfFlags, setNoOfFlags] = useState<number | string>(gameLevel.BOMBS);
  const [noOfCellsLeft, setNoOfCellsLeft] = useState(
    gameLevel.COL * gameLevel.ROW - gameLevel.BOMBS
  );
  const [gameOverState, setGameOverState] = useState({
    gameOver: false,
    win: false,
  });

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer((timer) => timer + 1), 1_000);

    if (gameOverState.gameOver) clearInterval(interval);

    return () => clearInterval(interval);
  }, [gameOverState]);

  useEffect(() => {
    freshBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameLevel]);

  useEffect(() => {
    if (noOfCellsLeft === 0) {
      setGameOverState({ gameOver: true, win: true });
      setNoOfFlags("WIN");
    }
  }, [noOfCellsLeft]);

  /** @description Creates a fresh board. */
  const freshBoard = () => {
    Board.createBoard(gameLevel.ROW, gameLevel.COL, gameLevel.BOMBS);

    setMineLocations(Board.mines);
    setNoOfFlags(gameLevel.BOMBS);
    setNoOfCellsLeft(gameLevel.COL * gameLevel.ROW - gameLevel.BOMBS);
    setGameOverState({ gameOver: false, win: false });
    setGrid(Board.board);
    setTimer(0);
  };

  /** @description Handles whenever a cell is flagged. */
  const handleUpdateFlag = (e: Event, x: number, y: number) => {
    e.preventDefault();

    if (gameOverState.gameOver) return;
    if (grid[x][y].revealed) return;

    setNoOfFlags((prev: any) => prev + (grid[x][y].flagged ? 1 : -1));

    let newGrid = [...grid];
    newGrid[x][y].flagged = !newGrid[x][y].flagged;
    return setGrid(newGrid);
  };

  /** @description Handles whenever a cell is revealed. */
  const handleRevealCell = (x: number, y: number) => {
    if (gameOverState.gameOver) return;

    let newGrid = [...grid];

    if (grid[x][y].flagged) {
      newGrid[x][y].flagged = false;
      setNoOfFlags((prev: any) => prev + 1);
    } else {
      revealCell(newGrid, x, y);
    }

    return setGrid(newGrid);
  };

  /** @description Describes the process flow for when a cell is revealed. */
  const revealCell = (arr: any, x: number, y: number) => {
    if (arr[x][y].revealed === true) return;

    arr[x][y].revealed = true;

    if (arr[x][y].value !== "X") setNoOfCellsLeft((prev) => prev - 1);

    if (arr[x][y].flagged) {
      arr[x][y].flagged = false;
      setNoOfFlags((prev: any) => prev + 1);
    }

    if (grid[x][y].value === 0) return adjacentReveal(arr, x, y);

    if (arr[x][y].value === "X") {
      arr[x][y].loser = true;
      for (let m = 0; m < mineLoctions.length; m++)
        arr[mineLoctions[m][0]][mineLoctions[m][1]].revealed = true;

      setGameOverState((prev) => ({ ...prev, gameOver: true }));
      setNoOfFlags("LOS");
    }

    return arr;
  };

  /** @description Reveals adjacent cells to the provided. */
  const adjacentReveal = (arr: any, x: number, y: number) => {
    VECTORS.forEach(([dx, dy]) => {
      let x2 = x + dx;
      let y2 = y + dy;

      if (
        x2 >= 0 &&
        y2 >= 0 &&
        x2 < gameLevel.ROW &&
        y2 < gameLevel.COL &&
        arr[x2][y2].value !== "X" &&
        !arr[x2][y2].revealed
      ) {
        return revealCell(arr, x2, y2);
      }
    });
  };

  /** @description Handles when the user changes the level. */
  const handleChangeLevel = (target: string) => {
    switch (target) {
      case "beginner":
        return setGameLevel(LEVELS.BEGINNER);
      case "intermediate":
        return setGameLevel(LEVELS.INTERMEDIATE);
      case "expert":
        return setGameLevel(LEVELS.EXPERT);
      default:
        return setGameLevel(LEVELS.EXPERT);
    }
  };

  if (!grid) return <div>Generating Board...</div>;

  return (
    <Style.StyledBoard>
      {gameOverState.gameOver && (
        <Style.GameOverModel>
          {gameOverState.win ? "You Won" : "Ouch, Game Over"}
        </Style.GameOverModel>
      )}
      <Toolbar handleChangeLevel={handleChangeLevel} freshBoard={freshBoard} />
      <Style.DividerElement />
      <ScoreCard
        flagsLeft={noOfFlags}
        timer={timer}
        reset={freshBoard}
        {...gameOverState}
      />
      <div className="force-center">
        <Style.GridWrapper>
          {grid.map((row: any, r: any) => {
            return (
              <Style.RowWrapper key={r}>
                {row.map((cell: any, c: any) => {
                  return (
                    <Cell
                      key={c}
                      info={cell}
                      gameLevel={gameLevel}
                      handleRevealCell={handleRevealCell}
                      updateFlag={handleUpdateFlag}
                      cellSize={25}
                      gameOver={gameOverState.gameOver}
                      won={gameOverState.win}
                    />
                  );
                })}
              </Style.RowWrapper>
            );
          })}
        </Style.GridWrapper>
      </div>
    </Style.StyledBoard>
  );
}

export default Minesweeper;
