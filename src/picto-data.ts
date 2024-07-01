import { type TransformBuilder, create as createTransform } from "./transform.js";

export type SVGAttributes = Readonly<Record<string, string | number>>;

export type SVGElement = readonly [string, SVGAttributes, readonly SVGElement[]] | readonly [string, SVGAttributes];

export type PictoComponent = Readonly<{
  svg: () => readonly SVGElement[];
}>;

export type PictoData = Readonly<{
  components: readonly PictoComponent[];
}>;

export const emptyData: PictoData = { components: [] };

export const addComponent = (data: PictoData, component: PictoComponent): PictoData => ({
  ...data,
  components: [...data.components, component],
});

export type RenderingAttributes = Readonly<
  Partial<{
    stroke: string;
    fill: string;
    strokeWidth: number;
    lineCap: string;
    lineJoin: string;
    transform: (transform: TransformBuilder) => TransformBuilder;
  }>
>;

export const svgRenderingAttributes = (attributes: RenderingAttributes): SVGAttributes => {
  const attribute = <T>(key: string, value: T | undefined, f: (value: T) => string | number = String) =>
    value != undefined ? { [key]: f(value) } : {};
  return {
    ...attribute("stroke", attributes.stroke),
    ...attribute("fill", attributes.fill),
    ...attribute("stroke-width", attributes.strokeWidth),
    ...attribute("stroke-linecap", attributes.lineCap),
    ...attribute("stroke-linejoin", attributes.lineJoin),
    ...attribute("transform", attributes.transform, (transform) => transform(createTransform()).svg()),
  };
};
