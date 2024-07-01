import { type PictoData, type RenderingAttributes, addComponent, svgRenderingAttributes } from "./picto-data.js";
import { type Rect, type Coord } from "./coord.js";

export const rect = (
  data: PictoData,
  {
    origin: { x, y },
    size: { width, height },
    round,
    ...restParams
  }: RenderingAttributes &
    Rect &
    Readonly<{
      round?: Partial<Coord> | number;
    }>
): PictoData =>
  addComponent(data, {
    svg: () => [
      "rect",
      {
        x,
        y,
        width,
        height,
        ...(round == undefined
          ? {}
          : typeof round === "number"
          ? { rx: round, ry: round }
          : {
              ...(round.x == undefined ? {} : { rx: round.x }),
              ...(round.y == undefined ? {} : { ry: round.y }),
            }),
        ...svgRenderingAttributes(restParams),
      },
    ],
  });
