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
