import { type PictoData, type RenderingAttributes, addComponent, svgRenderingAttributes } from "./picto-data.js";
import { type PictoFragment, create as createFragment } from "./fragment.js";

export type PictoGroupOptions = RenderingAttributes;

export const group = (
  data: PictoData,
  options: PictoGroupOptions,
  builder: (fragment: PictoFragment) => PictoFragment
): PictoData => {
  const fragment = builder(createFragment());
  return addComponent(data, {
    svg: () => [["g", svgRenderingAttributes(options), fragment.svg()]],
  });
};
