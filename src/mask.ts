import { v4 as uuidv4 } from "uuid";
import { type PictoData, addComponent } from "./picto-data.js";
import { type PictoFragment, create as createFragment } from "./fragment.js";

export const mask = (
  data: PictoData,
  mask: (fragment: PictoFragment) => PictoFragment,
  applied: (fragment: PictoFragment) => PictoFragment
): PictoData => {
  const id = uuidv4();
  const maskFragment = mask(createFragment());
  const appliedFragment = applied(createFragment());
  return addComponent(data, {
    svg: () => [
      ["mask", { id }, maskFragment.svg()],
      ["g", { mask: `url(#${id})` }, appliedFragment.svg()],
    ],
  });
};
