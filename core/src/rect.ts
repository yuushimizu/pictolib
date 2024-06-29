import { type PictoData, type PictoComponentConstraint } from "./picto-data";

export type RectComponent = Readonly<{
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
}>;

export const rect = <C extends PictoComponentConstraint>(
  data: PictoData<C>,
  x: number,
  y: number,
  width: number,
  height: number
): PictoData<C | RectComponent> => ({
  ...data,
  components: [
    ...data.components,
    {
      type: "rect",
      x,
      y,
      width,
      height,
    },
  ],
});
