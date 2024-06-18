import { type PictoData } from "./picto.js";
import { path } from "./path.js";

type PictoBase = Readonly<{
  toSVG: () => string;
}>;

type Manipulator<T extends (data: PictoData, ...args: readonly any[]) => PictoData> = T extends (
  data: PictoData,
  ...args: infer Args
) => PictoData
  ? (...args: Args) => Picto
  : never;

export type Picto = PictoBase &
  Readonly<{
    path: Manipulator<typeof path>;
  }>;

function manipulator<Args extends readonly unknown[], T extends (data: PictoData, ...args: Args) => PictoData>(
  f: T,
  data: PictoData
): (...args: Args) => Picto {
  return (...args) => wrap(f(data, ...args));
}

function wrap(data: PictoData): Picto {
  return {
    toSVG: () =>
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g stroke="black">${data.components
        .map((component) => component.toSVG())
        .join("")}</g></svg>`,
    path: manipulator(path, data),
  };
}

export function create(): Picto {
  return wrap({ components: [] });
}
