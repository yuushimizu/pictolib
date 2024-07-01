import { type PictoData, addComponent } from "./picto-data.js";
import { type Coord } from "./coord.js";

export const circle = (
  data: PictoData,
  {
    center,
    radius,
  }: Readonly<{
    center: Coord;
    radius: number;
  }>
): PictoData =>
  addComponent(data, {
    svg: () => ["circle", { cx: center.x, cy: center.y, r: radius }],
  });
