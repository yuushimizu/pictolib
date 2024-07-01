import { type PictoData, type RenderingAttributes } from "./picto-data.js";
import { path } from "./path.js";
import { rect } from "./rect.js";
import { circle } from "./circle.js";
import { arc } from "./arc.js";
export type PictoGroupOptions = RenderingAttributes;
type ManipulatorFunctions = Readonly<{
    group: typeof group;
    path: typeof path;
    rect: typeof rect;
    circle: typeof circle;
    arc: typeof arc;
}>;
export type GroupManipulators = Readonly<{
    [K in keyof ManipulatorFunctions]: (...args: Parameters<ManipulatorFunctions[K]> extends readonly [PictoData, ...infer R] ? R : never) => PictoGroup;
}>;
export type PictoGroup = GroupManipulators & Readonly<{
    data: PictoData;
    repeat: (times: number, f: (group: PictoGroup, n: number) => PictoGroup) => PictoGroup;
}>;
declare const group: (data: PictoData, options: PictoGroupOptions, builder: (group: PictoGroup) => PictoGroup) => PictoData;
export declare const create: (options?: PictoGroupOptions) => PictoGroup;
export {};
