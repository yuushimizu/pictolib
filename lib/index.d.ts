import { type Rect } from "./coord.js";
import { type RenderingAttributes } from "./picto-data.js";
import { type FragmentManipulators } from "./fragment.js";
export { type PictoFragment } from "./fragment.js";
export type PictoOptions = RenderingAttributes & Readonly<Partial<{
    viewBox: Rect;
}>>;
type Manipulators = Readonly<{
    [K in keyof FragmentManipulators]: (...args: Parameters<FragmentManipulators[K]>) => Picto;
}>;
export type Picto = Manipulators & Readonly<{
    svg: () => string;
}>;
export declare const create: (options?: PictoOptions) => Picto;
