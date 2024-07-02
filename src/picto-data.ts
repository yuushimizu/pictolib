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

export type PresentationAttributes = Readonly<
  Partial<{
    stroke: string;
    fill: string;
    fillOpacity: number;
    strokeWidth: number;
    lineCap: string;
    lineJoin: string;
    dasharray: number | readonly number[];
    transform: (transform: TransformBuilder) => TransformBuilder;
  }>
>;

const svgAttribute = <T>(key: string, value: T | undefined, f: (value: T) => string | number = String) =>
  value != undefined ? { [key]: f(value) } : {};

export const svgPresentationAttributes = (attributes: PresentationAttributes): SVGAttributes => ({
  ...svgAttribute("stroke", attributes.stroke),
  ...svgAttribute("fill", attributes.fill),
  ...svgAttribute("fill-opacity", attributes.fillOpacity),
  ...svgAttribute("stroke-width", attributes.strokeWidth),
  ...svgAttribute("stroke-linecap", attributes.lineCap),
  ...svgAttribute("stroke-linejoin", attributes.lineJoin),
  ...svgAttribute("stroke-dasharray", attributes.dasharray, (value) =>
    (typeof value === "number" ? [value] : value).join(" ")
  ),
  ...svgAttribute("transform", attributes.transform, (transform) => transform(createTransform()).svg()),
});

export type ShapeStrokePresentationAttributes = PresentationAttributes &
  Readonly<
    Partial<{
      pathLength: number;
    }>
  >;

export const svgShapeStrokePresentationAttributes = (attributes: ShapeStrokePresentationAttributes): SVGAttributes => ({
  ...svgPresentationAttributes(attributes),
  ...svgAttribute("pathLength", attributes.pathLength),
});
