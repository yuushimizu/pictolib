import { type PictoData, type PictoComponentConstraint } from "./picto-data";
import { type Rect, type Coord } from "./coord.js";

type Params = Rect &
  Readonly<{
    round: undefined | Coord;
  }>;

export type RectComponent = Readonly<{
  type: "rect";
}> &
  Params;

export const rect = <C extends PictoComponentConstraint>(
  data: PictoData<C>,
  {
    round,
    ...params
  }: Omit<Params, "round"> &
    Readonly<{
      round?: Params["round"] | number;
    }>
): PictoData<C | RectComponent> => ({
  ...data,
  components: [
    ...data.components,
    {
      ...params,
      type: "rect",
      round: typeof round === "number" ? { x: round, y: round } : round,
    },
  ],
});
