import { type PictoData, type RenderingAttributes } from "./picto-data.js";
import { type Rect, type Coord } from "./coord.js";
export declare const rect: (data: PictoData, { x, y, width, height, round, ...restParams }: RenderingAttributes & Rect & Readonly<{
    round?: Partial<Coord> | number;
}>) => PictoData;
