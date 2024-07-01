import { type Rect } from "./coord.js";
import { type PictoGroup, type PictoGroupOptions, type PictoGroupManipulators } from "./group.js";
export { type PictoGroupOptions } from "./group.js";
export type PictoOptions = PictoGroupOptions & Readonly<Partial<{
    viewBox: Rect;
}>>;
type Manipulators = Readonly<{
    [K in keyof PictoGroupManipulators]: (...args: Parameters<PictoGroupManipulators[K]>) => Picto;
}>;
export type Picto = Manipulators & Readonly<{
    repeat: (...args: Parameters<PictoGroup["repeat"]>) => Picto;
    svg: () => string;
}>;
export declare const create: (options?: PictoOptions | undefined) => Picto;
