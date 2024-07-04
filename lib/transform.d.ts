import { type Coord } from "./coord";
export type Transform = Readonly<{
    svgAttribute: string;
}>;
declare const transformFunctions: {
    readonly matrix: (matrix: readonly [number, number, number, number, number, number]) => [string, readonly [number, number, number, number, number, number]];
    readonly translate: ({ x, y }: Partial<Coord>) => [string, number[]];
    readonly scale: (amount: number | Partial<Coord>) => [string, number[]];
    readonly rotate: (angle: number, origin?: Coord) => [string, number[]];
    readonly skewX: (amount: number) => [string, number[]];
    readonly skewY: (amount: number) => [string, number[]];
};
type TransformFunctions = typeof transformFunctions;
export type TransformBuilder = Readonly<{
    [Key in keyof TransformFunctions]: (...args: Parameters<TransformFunctions[Key]>) => TransformBuilder;
} & {
    svg: () => string;
}>;
export declare const create: () => Readonly<{
    readonly matrix: (matrix: readonly [number, number, number, number, number, number]) => TransformBuilder;
    readonly translate: (args_0: Partial<Readonly<{
        x: number;
        y: number;
    }>>) => TransformBuilder;
    readonly scale: (amount: number | Partial<Readonly<{
        x: number;
        y: number;
    }>>) => TransformBuilder;
    readonly rotate: (angle: number, origin?: Readonly<{
        x: number;
        y: number;
    }> | undefined) => TransformBuilder;
    readonly skewX: (amount: number) => TransformBuilder;
    readonly skewY: (amount: number) => TransformBuilder;
} & {
    svg: () => string;
}>;
export {};
