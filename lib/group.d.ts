import { type PictoData, type PresentationAttributes } from "./picto-data.js";
import { type PictoFragment } from "./fragment.js";
export type PictoGroupOptions = PresentationAttributes;
export declare const group: (data: PictoData, options: PictoGroupOptions, builder: (fragment: PictoFragment) => PictoFragment) => PictoData;
