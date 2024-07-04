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

type Percentage = `${number}%`;

type XPosition = "left" | "right";

type YPosition = "top" | "bottom";

type Position = number | Percentage | XPosition | YPosition | "center";

export type PresentationAttributes = Readonly<
  Partial<{
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
    transformOrigin:
      | Position
      | Readonly<{
          x: Exclude<Position, YPosition>;
          y: Exclude<Position, XPosition>;
        }>;
    style: string;
  }>
>;

const svgAttribute = <T>(key: string, value: T | undefined, f: (value: T) => string | number = String) =>
  value != undefined ? { [key]: f(value) } : {};

export const svgPresentationAttributes = (attributes: PresentationAttributes): SVGAttributes => ({
  ...svgAttribute("fill", attributes.fill),
  ...svgAttribute("fill-opacity", attributes.fillOpacity),
  ...svgAttribute("stroke", attributes.stroke),
  ...svgAttribute("stroke-opacity", attributes.strokeOpacity),
  ...svgAttribute("stroke-width", attributes.strokeWidth),
  ...svgAttribute("stroke-linecap", attributes.lineCap),
  ...svgAttribute("stroke-linejoin", attributes.lineJoin),
  ...svgAttribute("stroke-miterlimit", attributes.miterlimit),
  ...svgAttribute("stroke-dasharray", attributes.dasharray, (value) =>
    (typeof value === "number" ? [value] : value).join(" ")
  ),
  ...svgAttribute("stroke-dashoffset", attributes.dashoffset),
  ...svgAttribute("transform", attributes.transform, (transform) => transform(createTransform()).svg()),
  ...svgAttribute("transform-origin", attributes.transformOrigin, (value) =>
    typeof value === "string" || typeof value === "number" ? value : [value.x, value.y].join(" ")
  ),
  ...svgAttribute("style", attributes.style),
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
