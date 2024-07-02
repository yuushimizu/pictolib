import {
  type PictoData,
  type ShapeStrokePresentationAttributes,
  addComponent,
  svgShapeStrokePresentationAttributes,
} from "./picto-data.js";
import { type Coord } from "./coord.js";

export const circle = (
  data: PictoData,
  {
    center,
    radius,
    ...restParams
  }: ShapeStrokePresentationAttributes &
    Readonly<{
      center: Coord;
      radius: number;
    }>
): PictoData =>
  addComponent(data, {
    svg: () => [
      ["circle", { cx: center.x, cy: center.y, r: radius, ...svgShapeStrokePresentationAttributes(restParams) }],
    ],
  });
