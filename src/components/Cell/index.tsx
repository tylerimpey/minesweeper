import { useSetRecoilState } from "recoil";
import valueColor from "../../utils/getColor";
import Style from "./index.style";
import booleanWithId from "../../state/atoms/booleanWithId";

const Cell = ({ info, updateFlag, handleRevealCell, gameOver }: any) => {
  const setMouseDown = useSetRecoilState(
    booleanWithId("emoji-surprise", false)
  );

  return (
    <Style.Cell
      color={valueColor(info.value)}
      onClick={() => handleRevealCell(info.x, info.y)}
      onContextMenu={(e: any) => updateFlag(e, info.x, info.y)}
      className={[
        info.revealed ? "revealed" : "unrevealed",
        info.flagged ? "flagged" : "",
        info.loser ? "loser" : "",
        gameOver ? "over" : "",
      ].join(" ")}
      onMouseDown={() => {
        if (!gameOver) setMouseDown(true);
      }}
      onMouseUp={() => setMouseDown(false)}
    >
      {info.revealed ? (
        info.value === "X" ? (
          <img
            src="https://cdn.pr0xy.io/friday-beers/website/icons/keg.svg"
            alt="Keg"
          />
        ) : (
          info.value !== 0 && info.value
        )
      ) : info.flagged ? (
        <img
          src="https://cdn.pr0xy.io/friday-beers/website/icons/solo-cup-large.svg"
          alt="Solo Cup"
        />
      ) : (
        ""
      )}
    </Style.Cell>
  );
};

export default Cell;
