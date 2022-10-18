import styled from "styled-components";

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledBoard = styled.div`
  background-color: #cac6cb;
  margin-bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;

  div.force-center {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const DividerElement = styled.div`
  border-bottom: 1px solid #fff;
  border-top: 1px solid #808088;
  height: 1px;
`;

const GameOverModel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -20px;
  right: 4px;
  z-index: 100;
  font-family: Verdana, Helvetica;
  font-size: 11px;
  line-height: 11px;
`;

const Style = {
  DividerElement,
  RowWrapper,
  GridWrapper,
  StyledBoard,
  GameOverModel,
};

export default Style;
