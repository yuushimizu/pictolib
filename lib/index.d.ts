import { type PictoData } from "./picto.js";
import { path } from "./path.js";
type PictoBase = Readonly<{
    toSVG: () => string;
}>;
type Manipulator<T extends (data: PictoData, ...args: readonly any[]) => PictoData> = T extends (data: PictoData, ...args: infer Args) => PictoData ? (...args: Args) => Picto : never;
export type Picto = PictoBase & Readonly<{
    path: Manipulator<typeof path>;
}>;
export declare function create(): Picto;
export {};
