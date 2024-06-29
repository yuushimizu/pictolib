import { type Picto } from "pictolib";
type Options = Readonly<{
    x?: number | undefined;
    y?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
}>;
export declare const drawToCanvas: (context: CanvasRenderingContext2D, picto: Picto, options?: Options | undefined) => void;
export {};
