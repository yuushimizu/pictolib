import { type PictoData, type PictoComponent, type SVGElement } from "./picto-data.js";
import { group } from "./group.js";
import { path } from "./path.js";
import { rect } from "./rect.js";
import { circle } from "./circle.js";
import { arc } from "./arc.js";
import { mask } from "./mask.js";
declare const repeat: (data: PictoData, times: number, f: (fragment: PictoFragment, n: number) => PictoFragment) => PictoFragment;
type ManipulatorFunctions = Readonly<{
    fragment: typeof fragment;
    group: typeof group;
    path: typeof path;
    rect: typeof rect;
    circle: typeof circle;
    arc: typeof arc;
    mask: typeof mask;
    repeat: typeof repeat;
}>;
export type FragmentManipulators = Readonly<{
    [K in keyof ManipulatorFunctions]: (...args: Parameters<ManipulatorFunctions[K]> extends readonly [PictoData, ...infer R] ? R : never) => PictoFragment;
}>;
export type PictoFragment = FragmentManipulators & Readonly<{
    repeat: (times: number, f: (fragment: PictoFragment, n: number) => PictoFragment) => PictoFragment;
    components: readonly PictoComponent[];
    svg: () => readonly SVGElement[];
}>;
declare const fragment: (data: PictoData, builder: (fragment: PictoFragment) => PictoFragment) => PictoData;
export declare const create: () => PictoFragment;
export {};
