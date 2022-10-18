import { createRoot } from "react-dom/client";
import Minesweeper from "./components/Board";
import { RecoilRoot } from "recoil";

import "./style/config.scss";

const root = createRoot(document.getElementById("root")!);

root.render(
  <RecoilRoot>
    <Minesweeper />
  </RecoilRoot>
);
