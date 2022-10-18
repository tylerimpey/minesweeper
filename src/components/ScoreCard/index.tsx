import _ from "lodash";
import Style from "./index.style";
import { useRecoilState } from "recoil";
import booleanWithId from "../../state/atoms/booleanWithId";

const ScoreCard = ({ flagsLeft, gameOver, win, timer, reset }: any) => {
  const [mouseDown, setMouseDown] = useRecoilState(
    booleanWithId("emoji-surprise", false)
  );

  return (
    <Style.Container>
      <Style.Number>
        {_.map(String(flagsLeft).padStart(3, "0"), (digit, index) => (
          <span key={`score-index-${index}`}>{digit}</span>
        ))}
      </Style.Number>
      <Style.Emoji
        onClick={reset}
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
      >
        {mouseDown ? (
          <img
            src="https://cdn.pr0xy.io/friday-beers/website/icons/surprise.png"
            alt="Surprised"
          />
        ) : gameOver === true && win === false ? (
          <img
            src="https://cdn.pr0xy.io/friday-beers/website/icons/frown.png"
            alt="Frowny"
          />
        ) : (
          <img
            src="https://cdn.pr0xy.io/friday-beers/website/icons/smile.png"
            alt="Smiley"
          />
        )}
      </Style.Emoji>
      <Style.Number>
        {_.map(
          String(Math.min(timer, 999)).padStart(3, "0"),
          (digit, index) => (
            <span key={`timer-index-${index}`}>{digit}</span>
          )
        )}
      </Style.Number>
    </Style.Container>
  );
};

export default ScoreCard;
