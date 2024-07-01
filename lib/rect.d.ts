import { type PictoData } from "./picto-data.js";
import { type Rect, type Coord } from "./coord.js";
export declare const rect: (data: PictoData, { x, y, width, height, round, }: Rect & Readonly<{
    round?: Partial<Coord> | number;
}>) => PictoData;
