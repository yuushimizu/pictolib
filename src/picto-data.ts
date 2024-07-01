export type SVGAttributes = Readonly<Record<string, string | number>>;

export type SVGElement = readonly [string, SVGAttributes, readonly SVGElement[]] | readonly [string, SVGAttributes];

export type PictoComponent = Readonly<{
  svg: () => SVGElement;
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
  }>
>;

export const svgRenderingAttributes = (options: RenderingAttributes): SVGAttributes => {
  const attribute = <T>(key: string, value: T | undefined, f: (value: T) => string | number = String) =>
    value != undefined ? { [key]: f(value) } : {};
  return {
    ...attribute("stroke", options.stroke),
    ...attribute("fill", options.fill),
    ...attribute("stroke-width", options.strokeWidth),
    ...attribute("stroke-linecap", options.lineCap),
    ...attribute("stroke-linejoin", options.lineJoin),
  };
};
