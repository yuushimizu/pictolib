import { type PictoData, type ShapeStrokePresentationAttributes } from "./picto-data.js";
import { type Rect, type Coord } from "./coord.js";
export declare const rect: (data: PictoData, { origin: { x, y }, size: { width, height }, round, ...restParams }: ShapeStrokePresentationAttributes & Rect & Readonly<{
    round?: Partial<Coord> | number;
}>) => PictoData;
