import { type PictoData, type PictoComponentConstraint } from "./picto-data.js";
import { type PathComponent, path } from "./path.js";
import { type RectComponent, rect } from "./rect.js";
export type PictoGroupOptions = Readonly<{
    stroke?: string | undefined;
    fill?: string | undefined;
}>;
export type PictoComponent = PictoComponentConstraint & (PathComponent | RectComponent | GroupComponent);
type ManipulatorFunctions = Readonly<{
    group: typeof group;
    path: typeof path<PictoComponent>;
    rect: typeof rect<PictoComponent>;
}>;
export type PictoGroupManipulators = Readonly<{
    [K in keyof ManipulatorFunctions]: (...args: Parameters<ManipulatorFunctions[K]> extends readonly [PictoData<PictoComponent>, ...infer R] ? R : never) => PictoGroup;
}>;
export type PictoGroup = PictoGroupManipulators & Readonly<{
    data: PictoData<PictoComponent>;
}>;
export type GroupComponent = Readonly<{
    type: "group";
    options: PictoGroupOptions;
    components: readonly PictoComponent[];
}>;
declare const group: (data: PictoData<PictoComponent>, options: PictoGroupOptions, builder: (group: PictoGroup) => PictoGroup) => PictoData<PictoComponent>;
export declare const create: (options?: PictoGroupOptions | undefined) => PictoGroup;
export {};
