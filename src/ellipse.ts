import {
  type PictoData,
  type ShapeStrokePresentationAttributes,
  addComponent,
  svgShapeStrokePresentationAttributes,
} from "./picto-data.js";
import { type Coord } from "./coord.js";

export const ellipse = (
  data: PictoData,
  {
    center,
    radius,
    ...restParams
  }: ShapeStrokePresentationAttributes &
    Readonly<{
      center: Coord;
      radius: number | Coord;
    }>
): PictoData => {
  const { x: xRadius, y: yRadius } = typeof radius === "number" ? { x: radius, y: radius } : radius;
  return addComponent(data, {
    svg: () => [
      [
        "ellipse",
        {
          cx: center.x,
          cy: center.y,
          rx: xRadius,
          ry: yRadius,
          ...svgShapeStrokePresentationAttributes(restParams),
        },
      ],
    ],
  });
};
