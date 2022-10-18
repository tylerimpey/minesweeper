import styled from "styled-components";

const Cell = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  color: ${(props) => props.color};
  width: 25px;
  height: 25px;

  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;

  &.unrevealed {
    border-right: 3px solid #7b7b7b;
    border-bottom: 3px solid #7b7b7b;
    border-top: 3px solid white;
    border-left: 3px solid white;
    background: #bdbdbd;
  }

  &.revealed {
    background: #c0c0c0;
    border-top: 2px solid #7b7b7b;
    border-left: 2px solid #7b7b7b;
    font-family: "Pixel";
    font-size: 18px;
    font-weight: 900;
    cursor: unset;

    img {
      transform: rotate(45deg) translate(-2px, -3px);
      height: 20px;
      z-index: 0;
    }
  }

  &:not(.over):active {
    background: #c0c0c0;
    border-top: 2px solid #7b7b7b;
    border-left: 2px solid #7b7b7b;
    font-family: "Pixel";
    font-size: 18px;
    font-weight: 900;
  }

  &.flagged {
    img {
      height: 18px;
      z-index: 0;
    }
  }

  &.loser {
    background: red;
  }

  &.over {
    cursor: default;
  }
`;

const Style = {
  Cell,
};

export default Style;
