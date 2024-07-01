import { type PictoData, type RenderingAttributes, addComponent, svgRenderingAttributes } from "./picto-data.js";
import { type Coord } from "./coord.js";

export const circle = (
  data: PictoData,
  {
    center,
    radius,
    ...restParams
  }: RenderingAttributes &
    Readonly<{
      center: Coord;
      radius: number;
    }>
): PictoData =>
  addComponent(data, {
    svg: () => [["circle", { cx: center.x, cy: center.y, r: radius, ...svgRenderingAttributes(restParams) }]],
  });
