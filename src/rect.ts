import { type PictoData } from "./picto-data";

export const rect = (data: PictoData, x: number, y: number, width: number, height: number): PictoData => ({
  ...data,
  components: [
    ...data.components,
    {
      toSVG: () => `<rect x="${x}" y="${y}" width="${width}" height="${height}"></rect>`,
    },
  ],
});
