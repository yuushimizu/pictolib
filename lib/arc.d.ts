import { type PictoData, type RenderingAttributes } from "./picto-data.js";
import { type Coord } from "./coord.js";
export declare const arc: (data: PictoData, { center, radius, start, end, counterclockwise, ...restParams }: RenderingAttributes & Readonly<{
    center: Coord;
    radius: number;
    start: number;
    end: number;
    counterclockwise?: boolean;
}>) => PictoData;
