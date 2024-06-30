export type Coord = Readonly<{
    x: number;
    y: number;
}>;
export type Size = Readonly<{
    width: number;
    height: number;
}>;
export type Rect = Coord & Size;
export declare const normalizeAngle: (angle: number) => number;
