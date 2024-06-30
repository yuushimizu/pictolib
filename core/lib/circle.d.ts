import { type PictoData, type PictoComponentConstraint } from "./picto-data.js";
import { type Coord } from "./coord.js";
type Params = Readonly<{
    center: Coord;
    radius: number;
}>;
export type CircleComponent = Readonly<{
    type: "circle";
}> & Params;
export declare const circle: <C extends PictoComponentConstraint>(data: PictoData<C>, params: Params) => PictoData<C | CircleComponent>;
export {};
