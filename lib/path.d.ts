import { type PictoData, type ShapeStrokePresentationAttributes } from "./picto-data.js";
import { type Coord } from "./coord.js";
type PathCommand = Readonly<{
    d: string;
}>;
export type PathBuilder = Readonly<{
    commands: readonly PathCommand[];
} & {
    [K in "move" | "moveTo" | "line" | "lineTo"]: (point: Coord) => PathBuilder;
} & {
    [K in "hLine" | "hLineTo" | "vLine" | "vLineTo"]: (arg: number) => PathBuilder;
} & {
    [K in "curve" | "curveTo"]: (point1: Coord, point2: Coord, point3?: Coord) => PathBuilder;
} & {
    [K in "arc" | "arcTo"]: (end: Coord, params: {
        radius: number | Coord;
        rotation?: number;
        largeArc?: boolean;
        counterclockwise?: boolean;
    }) => PathBuilder;
} & {
    close: () => PathBuilder;
    repeat: (times: number, f: (builder: PathBuilder, n: number) => PathBuilder) => PathBuilder;
}>;
export declare const path: (data: PictoData, params: ShapeStrokePresentationAttributes, build: (builder: PathBuilder) => PathBuilder) => PictoData;
export {};
