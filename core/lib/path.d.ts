import { type PictoData, type PictoComponentConstraint } from "./picto-data.js";
import { type Coord } from "./coord.js";
type MoveLine = Readonly<{
    type: "moveBy" | "moveTo" | "lineBy" | "lineTo";
}> & Coord;
type PathCommand = Readonly<{
    d: string;
} & MoveLine>;
export type PathComponent = Readonly<{
    type: "path";
    d: string;
}>;
export type PathBuilder = Readonly<{
    commands: readonly PathCommand[];
} & {
    [K in "move" | "moveTo" | "line" | "lineTo"]: (point: Coord) => PathBuilder;
}>;
export declare const path: <C extends PictoComponentConstraint>(data: PictoData<C>, build: (builder: PathBuilder) => PathBuilder) => PictoData<C | PathComponent>;
export {};
