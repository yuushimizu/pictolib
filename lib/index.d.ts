import { type PictoData } from "./picto-data.js";
import { path } from "./path.js";
type PictoOptions = Readonly<{
    viewBox?: readonly [number, number, number, number] | undefined;
    stroke?: string | undefined;
}>;
type Manipulator<T extends (data: PictoData, ...args: readonly any[]) => PictoData> = T extends (data: PictoData, ...args: infer Args) => PictoData ? (...args: Args) => Picto : never;
export type Picto = Readonly<{
    toSVG: () => string;
    path: Manipulator<typeof path>;
}>;
export declare function create(options?: PictoOptions): Picto;
export {};
