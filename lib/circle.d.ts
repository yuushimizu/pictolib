import { type PictoData, type RenderingAttributes } from "./picto-data.js";
import { type Coord } from "./coord.js";
export declare const circle: (data: PictoData, { center, radius, ...restParams }: RenderingAttributes & Readonly<{
    center: Coord;
    radius: number;
}>) => PictoData;
