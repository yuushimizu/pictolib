export type PictoComponent = Readonly<{
    toSVG: () => string;
}>;
export type PictoData = Readonly<{
    components: readonly PictoComponent[];
}>;
