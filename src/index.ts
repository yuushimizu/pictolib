import { type PictoData } from "./picto-data.js";
import { path } from "./path.js";

type PictoOptions = Readonly<{
  viewBox?: readonly [number, number, number, number] | undefined;
  stroke?: string | undefined;
}>;

type Manipulator<T extends (data: PictoData, ...args: readonly any[]) => PictoData> = T extends (
  data: PictoData,
  ...args: infer Args
) => PictoData
  ? (...args: Args) => Picto
  : never;

export type Picto = Readonly<{
  toSVG: () => string;
  path: Manipulator<typeof path>;
}>;

function manipulator<Args extends readonly unknown[], T extends (data: PictoData, ...args: Args) => PictoData>(
  f: T,
  data: PictoData,
  options: PictoOptions
): (...args: Args) => Picto {
  return (...args) => wrap(f(data, ...args), options);
}

function wrap(data: PictoData, options: PictoOptions): Picto {
  return {
    toSVG: () =>
      `<svg ${[
        ["xmlns", "http://www.w3.org/2000/svg"],
        ...(options.viewBox ? [["viewBox", options.viewBox.join(" ")]] : []),
        ...(options.stroke ? [["stroke", options.stroke]] : []),
      ]
        .map(([name, value]) => `${name}="${value}"`)
        .join(" ")}>${data.components.map((component) => component.toSVG()).join("")}</svg>`,
    path: manipulator(path, data, options),
  };
}

export function create(options: PictoOptions = {}): Picto {
  return wrap({ components: [] }, options);
}
