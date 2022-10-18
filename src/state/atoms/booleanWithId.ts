import { atom } from "recoil";
import { memoize } from "lodash";

const stringWithId = memoize((id, defaultValue) =>
  atom({ key: `${id}`, default: defaultValue })
);

export default stringWithId;
