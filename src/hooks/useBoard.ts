import { useState } from "react";
import _ from "lodash";

export const VECTORS: Array<Array<number>> = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

interface Cell {
  value: number | string;
  revealed: boolean;
  flagged: boolean;
  x: number;
  y: number;
  loser: boolean;
}

type Board = Array<Array<Cell>>;

const useBoard = () => {
  const [mines, setMines] = useState<Array<Array<number>>>([]);
  const [board, setBoard] = useState<Board>([]);

  const flipFlagged = (x: number, y: number) => {
    const newBoard = _.cloneDeep(board);
    newBoard[x][y].flagged = !newBoard[x][y].flagged;
    setBoard(newBoard);
  };

  const createBoard = (rows: number, cols: number, bombs: number) => {
    let coordinates: Array<Array<any>> = [];

    const newBoard: Board = _.map(_.range(0, rows), (i) => {
      return _.map(_.range(0, cols), (j) => {
        coordinates.push([i, j]);

        return {
          value: 0,
          revealed: false,
          x: i,
          y: j,
          flagged: false,
          loser: false,
        };
      });
    });

    coordinates = _.shuffle(coordinates);
    let newMines = coordinates.slice(0, bombs);

    // assigning the values to cells surrounding the bombs
    newMines.forEach(([x, y]) => {
      newBoard[x][y].value = "X";

      VECTORS.forEach(([dx, dy]) => {
        let x2 = x + dx;
        let y2 = y + dy;
        if (
          x2 >= 0 &&
          y2 >= 0 &&
          x2 < rows &&
          y2 < cols &&
          typeof newBoard[x2][y2].value === "number"
        ) {
          (newBoard[x2][y2].value as number)++;
        }
      });
    });

    setBoard(newBoard);
    setMines(newMines);
  };

  return { board, mines, flipFlagged, createBoard };
};

export default useBoard;
