import { type PictoData, type PictoComponentConstraint } from "./picto-data.js";
type Point = Readonly<{
    x: number;
    y: number;
}>;
type MoveLine = Readonly<{
    type: "moveBy" | "moveTo" | "lineBy" | "lineTo";
}> & Point;
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
    [K in "move" | "moveTo" | "line" | "lineTo"]: (x: number, y: number) => PathBuilder;
}>;
export declare const path: <C extends PictoComponentConstraint>(data: PictoData<C>, build: (builder: PathBuilder) => PathBuilder) => PictoData<C | PathComponent>;
export {};
