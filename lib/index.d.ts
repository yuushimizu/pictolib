import { type PictoGroupOptions, type PictoGroupManipulators } from "./group.js";
type PictoOptions = PictoGroupOptions & Readonly<{
    viewBox?: readonly [number, number, number, number] | undefined;
}>;
type Manipulators = Readonly<{
    [K in keyof PictoGroupManipulators]: (...args: Parameters<PictoGroupManipulators[K]>) => Picto;
}>;
export type Picto = Manipulators & Readonly<{
    toSVG: () => string;
}>;
export declare const create: (options?: PictoOptions) => Picto;
export {};
