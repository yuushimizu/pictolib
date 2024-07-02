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
export type PresentationAttributes = Readonly<Partial<{
    stroke: string;
    fill: string;
    fillOpacity: number;
    strokeWidth: number;
    lineCap: string;
    lineJoin: string;
    dasharray: number | readonly number[];
    transform: (transform: TransformBuilder) => TransformBuilder;
}>>;
export declare const svgPresentationAttributes: (attributes: PresentationAttributes) => SVGAttributes;
export type ShapeStrokePresentationAttributes = PresentationAttributes & Readonly<Partial<{
    pathLength: number;
}>>;
export declare const svgShapeStrokePresentationAttributes: (attributes: ShapeStrokePresentationAttributes) => SVGAttributes;
