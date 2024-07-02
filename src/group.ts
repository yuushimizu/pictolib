import { type PictoData, type PresentationAttributes, addComponent, svgPresentationAttributes } from "./picto-data.js";
import { type PictoFragment, create as createFragment } from "./fragment.js";

export type PictoGroupOptions = PresentationAttributes;

export const group = (
  data: PictoData,
  options: PictoGroupOptions,
  builder: (fragment: PictoFragment) => PictoFragment
): PictoData => {
  const fragment = builder(createFragment());
  return addComponent(data, {
    svg: () => [["g", svgPresentationAttributes(options), fragment.svg()]],
  });
};
