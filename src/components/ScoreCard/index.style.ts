import styled from "styled-components";
import { InnyButton, OutyButton } from "../../style/style-guide";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0 8px 0;

  height: 50px;
  align-items: center;
  padding: 6px;

  position: relative;

  ${InnyButton}
`;

const Number = styled.div`
  background: black;
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 2px;

  span {
    margin: 0;
    padding: 0;
    font-size: 50px;
    font-family: "Digital";
    color: #cf0000;
    width: 25px;
    text-align: right;
  }

  &:after {
    font-family: "Digital";
    content: "888";
    font-size: 50px;
    color: white;
    position: absolute;
    color: rgba(207, 0, 0, 0.33);
  }
`;

const Emoji = styled.div`
  height: 34px;
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${OutyButton}

  img {
    height: 18px;
    width: 18px;
    image-rendering: pixelated;
    user-select: none;
  }

  &:active {
    ${InnyButton}
  }
`;

const Style = { Container, Number, Emoji };

export default Style;
