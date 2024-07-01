import { type TransformBuilder } from "./transform.js";
export type SVGAttributes = Readonly<Record<string, string | number>>;
export type SVGElement = readonly [string, SVGAttributes, readonly SVGElement[]] | readonly [string, SVGAttributes];
export type PictoComponent = Readonly<{
    svg: () => SVGElement;
}>;
export type PictoData = Readonly<{
    components: readonly PictoComponent[];
}>;
export declare const emptyData: PictoData;
export declare const addComponent: (data: PictoData, component: PictoComponent) => PictoData;
export type RenderingAttributes = Readonly<Partial<{
    stroke: string;
    fill: string;
    strokeWidth: number;
    lineCap: string;
    lineJoin: string;
    transform: (transform: TransformBuilder) => TransformBuilder;
}>>;
export declare const svgRenderingAttributes: (attributes: RenderingAttributes) => SVGAttributes;
