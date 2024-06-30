import { type PictoData, type PictoComponentConstraint, addComponent } from "./picto-data.js";
import { type Coord } from "./coord.js";

type Params = Readonly<{
  center: Coord;
  radius: number;
}>;

export type CircleComponent = Readonly<{
  type: "circle";
}> &
  Params;

export const circle = <C extends PictoComponentConstraint>(
  data: PictoData<C>,
  params: Params
): PictoData<C | CircleComponent> =>
  addComponent<C | CircleComponent>(data, {
    ...params,
    type: "circle",
  });
