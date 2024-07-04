import { type TransformBuilder } from "./transform.js";
export type SVGAttributes = Readonly<Record<string, string | number>>;
export type SVGElement = readonly [string, SVGAttributes, readonly SVGElement[]] | readonly [string, SVGAttributes];
export type PictoComponent = Readonly<{
    svg: () => readonly SVGElement[];
}>;
export type PictoData = Readonly<{
    components: readonly PictoComponent[];
}>;
export declare const emptyData: PictoData;
export declare const addComponent: (data: PictoData, component: PictoComponent) => PictoData;
type Percentage = `${number}%`;
type XPosition = "left" | "right";
type YPosition = "top" | "bottom";
type Position = number | Percentage | XPosition | YPosition | "center";
export type PresentationAttributes = Readonly<Partial<{
    fill: string;
    fillOpacity: number;
    stroke: string;
    strokeOpacity: number;
    strokeWidth: number;
    lineCap: string;
    lineJoin: string;
    miterlimit: number;
    dasharray: number | readonly number[];
    dashoffset: number;
    transform: (transform: TransformBuilder) => TransformBuilder;
    transformOrigin: Position | Readonly<{
        x: Exclude<Position, YPosition>;
        y: Exclude<Position, XPosition>;
    }>;
    style: string;
}>>;
export declare const svgPresentationAttributes: (attributes: PresentationAttributes) => SVGAttributes;
export type ShapeStrokePresentationAttributes = PresentationAttributes & Readonly<Partial<{
    pathLength: number;
}>>;
export declare const svgShapeStrokePresentationAttributes: (attributes: ShapeStrokePresentationAttributes) => SVGAttributes;
export {};
