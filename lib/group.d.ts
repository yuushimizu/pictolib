import { type PictoData, type PictoComponent } from "./picto-data.js";
import { path } from "./path.js";
import { rect } from "./rect.js";
export type PictoGroupOptions = Readonly<{
    stroke?: string | undefined;
}>;
type ManipulatorFunctions = Readonly<{
    group: typeof group;
    path: typeof path;
    rect: typeof rect;
}>;
export type PictoGroupManipulators = Readonly<{
    [K in keyof ManipulatorFunctions]: (...args: Parameters<ManipulatorFunctions[K]> extends readonly [PictoData, ...infer R] ? R : never) => PictoGroup;
}>;
export type PictoGroup = PictoGroupManipulators & Readonly<{
    components: readonly PictoComponent[];
}>;
declare const group: (data: PictoData, options: PictoGroupOptions, builder: (group: PictoGroup) => PictoGroup) => PictoData;
export declare const create: (options?: PictoGroupOptions) => PictoGroup;
export {};
