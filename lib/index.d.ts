import { type Rect } from "./coord.js";
import { type PictoGroup, type PictoGroupOptions, type GroupManipulators } from "./group.js";
export { type PictoGroup } from "./group.js";
export type PictoOptions = PictoGroupOptions & Readonly<Partial<{
    viewBox: Rect;
}>>;
type Manipulators = Readonly<{
    [K in keyof GroupManipulators]: (...args: Parameters<GroupManipulators[K]>) => Picto;
}>;
export type Picto = Manipulators & Readonly<{
    repeat: (...args: Parameters<PictoGroup["repeat"]>) => Picto;
    svg: () => string;
}>;
export declare const create: (options?: PictoOptions) => Picto;
