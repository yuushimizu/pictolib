import { type PictoData, type RenderingAttributes } from "./picto-data.js";
import { type PictoFragment } from "./fragment.js";
export type PictoGroupOptions = RenderingAttributes;
export declare const group: (data: PictoData, options: PictoGroupOptions, builder: (fragment: PictoFragment) => PictoFragment) => PictoData;
