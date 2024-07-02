import { type PictoData, type RenderingAttributes, addComponent, svgRenderingAttributes } from "./picto-data.js";
import { type Coord, normalizeAngle } from "./coord.js";

export const arc = (
  data: PictoData,
  {
    center,
    radius,
    start,
    end,
    counterclockwise,
    ...restParams
  }: RenderingAttributes &
    Readonly<{
      center: Coord;
      radius: number | Coord;
      start: number;
      end: number;
      counterclockwise?: boolean;
    }>
): PictoData => {
  const { x: xRadius, y: yRadius } = typeof radius === "number" ? { x: radius, y: radius } : radius;
  return addComponent(data, {
    svg: () => [
      [
        "path",
        {
          d: (
            [
              ["M", [center.x + xRadius * Math.cos(start), center.y + yRadius * Math.sin(start)]],
              [
                "A",
                [
                  xRadius,
                  yRadius,
                  0,
                  normalizeAngle(counterclockwise ? start - end : end - start) > Math.PI ? 1 : 0,
                  counterclockwise ? 0 : 1,
                  center.x + xRadius * Math.cos(end),
                  center.y + yRadius * Math.sin(end),
                ],
              ],
            ] as const
          )
            .map(([command, args]) => `${command}${args.join(",")}`)
            .join(" "),
          ...svgRenderingAttributes(restParams),
        },
      ],
    ],
  });
};
