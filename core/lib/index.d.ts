import { type PictoGroupOptions, type PictoGroupManipulators, type PictoComponent } from "./group.js";
export { type PictoComponent, type PictoGroupOptions } from "./group.js";
export type PictoOptions = PictoGroupOptions & Readonly<{
    viewBox?: readonly [number, number, number, number] | undefined;
}>;
type Manipulators = Readonly<{
    [K in keyof PictoGroupManipulators]: (...args: Parameters<PictoGroupManipulators[K]>) => Picto;
}>;
export type Picto = Manipulators & Readonly<{
    options: PictoOptions;
    components: readonly PictoComponent[];
}>;
export declare const create: (options?: PictoOptions | undefined) => Picto;