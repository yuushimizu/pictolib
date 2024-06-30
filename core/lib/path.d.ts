import { type PictoData, type PictoComponentConstraint } from "./picto-data.js";
import { type Coord } from "./coord.js";
type PathCommand = Readonly<{
    d: string;
}>;
export type PathComponent = Readonly<{
    type: "path";
    d: string;
}>;
export type PathBuilder = Readonly<{
    commands: readonly PathCommand[];
} & {
    [K in "move" | "moveTo" | "line" | "lineTo"]: (point: Coord) => PathBuilder;
} & {
    close: () => PathBuilder;
    repeat: (times: number, f: (builder: PathBuilder, n: number) => PathBuilder) => PathBuilder;
}>;
export declare const path: <C extends PictoComponentConstraint>(data: PictoData<C>, build: (builder: PathBuilder) => PathBuilder) => PictoData<C | PathComponent>;
export {};
