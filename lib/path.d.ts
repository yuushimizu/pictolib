import { type PictoData } from "./picto-data.js";
import { type Coord } from "./coord.js";
type PathCommand = Readonly<{
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
export declare const path: (data: PictoData, build: (builder: PathBuilder) => PathBuilder) => PictoData;
export {};
