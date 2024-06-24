import { type PictoData } from "./picto-data.js";
import { path } from "./path.js";
import { rect } from "./rect.js";
type PictoOptions = Readonly<{
    viewBox?: readonly [number, number, number, number] | undefined;
    stroke?: string | undefined;
}>;
type ManipulatorParameters<T extends (data: PictoData, ...args: readonly never[]) => PictoData> = Parameters<T> extends readonly [PictoData, ...infer R] ? R : never;
type Manipulator<T extends (data: PictoData, ...args: readonly never[]) => PictoData, R> = (...args: ManipulatorParameters<T>) => R;
export type Picto = Readonly<{
    toSVG: () => string;
    path: Manipulator<typeof path, Picto>;
    rect: Manipulator<typeof rect, Picto>;
}>;
export type PictoGroup = Readonly<{
    toSVG: () => string;
    path: Manipulator<typeof path, PictoGroup>;
    rect: Manipulator<typeof rect, PictoGroup>;
}>;
export declare function create(options?: PictoOptions): Picto;
export {};
