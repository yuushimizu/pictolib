import { type PictoData, type PictoComponentConstraint } from "./picto-data.js";
import { type Rect, type Coord } from "./coord.js";
type Params = Rect & Readonly<{
    round: undefined | Coord;
}>;
export type RectComponent = Readonly<{
    type: "rect";
}> & Params;
export declare const rect: <C extends PictoComponentConstraint>(data: PictoData<C>, { round, ...params }: Omit<Params, "round"> & Readonly<{
    round?: Params["round"] | number;
}>) => PictoData<C | RectComponent>;
export {};
