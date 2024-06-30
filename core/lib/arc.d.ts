import { type PictoData, type PictoComponentConstraint } from "./picto-data.js";
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
}> & Params;
export declare const arc: <C extends PictoComponentConstraint>(data: PictoData<C>, params: Omit<Params, "counterclockwise"> & Partial<Pick<Params, "counterclockwise">>) => PictoData<C | ArcComponent>;
export {};
