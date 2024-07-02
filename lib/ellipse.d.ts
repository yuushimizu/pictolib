import { type PictoData, type ShapeStrokePresentationAttributes } from "./picto-data.js";
import { type Coord } from "./coord.js";
export declare const ellipse: (data: PictoData, { center, radius, ...restParams }: ShapeStrokePresentationAttributes & Readonly<{
    center: Coord;
    radius: number | Coord;
}>) => PictoData;
