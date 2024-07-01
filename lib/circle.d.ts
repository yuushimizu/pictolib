import { type PictoData } from "./picto-data.js";
import { type Coord } from "./coord.js";
export declare const circle: (data: PictoData, { center, radius, }: Readonly<{
    center: Coord;
    radius: number;
}>) => PictoData;
