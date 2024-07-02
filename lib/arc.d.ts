import { type PictoData, type ShapeStrokePresentationAttributes } from "./picto-data.js";
import { type Coord } from "./coord.js";
export declare const arc: (data: PictoData, { center, radius, start, end, counterclockwise, ...restParams }: ShapeStrokePresentationAttributes & Readonly<{
    center: Coord;
    radius: number | Coord;
    start: number;
    end: number;
    counterclockwise?: boolean;
}>) => PictoData;
