import { type PictoData, type PictoComponentConstraint } from "./picto-data";
export type RectComponent = Readonly<{
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
}>;
export declare const rect: <C extends PictoComponentConstraint>(data: PictoData<C>, x: number, y: number, width: number, height: number) => PictoData<C | RectComponent>;
