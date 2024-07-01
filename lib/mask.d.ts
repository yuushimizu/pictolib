import { type PictoData } from "./picto-data.js";
import { type PictoFragment } from "./fragment.js";
export declare const mask: (data: PictoData, mask: (fragment: PictoFragment) => PictoFragment, applied: (fragment: PictoFragment) => PictoFragment) => PictoData;
