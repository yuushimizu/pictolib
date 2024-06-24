import { type PictoComponent, type PictoData } from "./picto-data";

export function rect(data: PictoData, x: number, y: number, width: number, height: number): PictoData {
  return {
    ...data,
    components: [
      ...data.components,
      {
        toSVG: () => `<rect x="${x}" y="${y}" width="${width}" height="${height}">`,
      },
    ],
  };
}
