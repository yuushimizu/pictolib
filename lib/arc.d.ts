import { type PictoData } from "./picto-data.js";
import { type Coord } from "./coord.js";
export declare const arc: (data: PictoData, { center, radius, start, end, counterclockwise, }: Readonly<{
    center: Coord;
    radius: number;
    start: number;
    end: number;
    counterclockwise?: boolean;
}>) => PictoData;
