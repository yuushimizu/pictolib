import { type PictoData, type PictoComponentConstraint, addComponent } from "./picto-data.js";
import { type Coord } from "./coord.js";

type Params = Readonly<{
  center: Coord;
  radius: number;
  start: number;
  end: number;
  counterclockwise: boolean;
}>;

export type ArcComponent = Readonly<{
  type: "arc";
}> &
  Params;

export const arc = <C extends PictoComponentConstraint>(
  data: PictoData<C>,
  params: Omit<Params, "counterclockwise"> & Partial<Pick<Params, "counterclockwise">>
): PictoData<C | ArcComponent> =>
  addComponent<C | ArcComponent>(data, {
    ...params,
    type: "arc",
    counterclockwise: params.counterclockwise ?? true,
  });
