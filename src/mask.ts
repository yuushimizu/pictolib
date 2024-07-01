import { v4 as uuidv4 } from "uuid";
import { type PictoData, addComponent } from "./picto-data.js";
import { type PictoGroup, create as createGroup } from "./group.js";

export const mask = (
  data: PictoData,
  mask: (group: PictoGroup) => PictoGroup,
  applied: (group: PictoGroup) => PictoGroup
): PictoData => {
  const id = uuidv4();
  const maskGroup = mask(createGroup());
  const appliedGroup = applied(createGroup());
  return addComponent(data, {
    svg: () => [
      "g",
      {},
      [
        ["mask", { id }, maskGroup.components.map((component) => component.svg())],
        ["g", { mask: `url(#${id})` }, appliedGroup.components.map((component) => component.svg())],
      ],
    ],
  });
};
