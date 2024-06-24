import { type PictoData } from "./picto-data.js";
import { path } from "./path.js";
import { rect } from "./rect.js";

type PictoOptions = Readonly<{
  viewBox?: readonly [number, number, number, number] | undefined;
  stroke?: string | undefined;
}>;

type ManipulatorParameters<T extends (data: PictoData, ...args: readonly never[]) => PictoData> =
  Parameters<T> extends readonly [PictoData, ...infer R] ? R : never;

type Manipulator<T extends (data: PictoData, ...args: readonly never[]) => PictoData, R> = (
  ...args: ManipulatorParameters<T>
) => R;

export type Picto = Readonly<{
  toSVG: () => string;
  path: Manipulator<typeof path, Picto>;
  rect: Manipulator<typeof rect, Picto>;
}>;

export type PictoGroup = Readonly<{
  toSVG: () => string;
  path: Manipulator<typeof path, PictoGroup>;
  rect: Manipulator<typeof rect, PictoGroup>;
}>;

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
    path: (...args) => wrap(path(data, ...args), options),
    rect: (...args) => wrap(rect(data, ...args), options),
  };
}

function wrapGroup(data: PictoData, options: PictoOptions): PictoGroup {
  return {
    toSVG: () =>
      `<svg ${[
        ["xmlns", "http://www.w3.org/2000/svg"],
        ...(options.viewBox ? [["viewBox", options.viewBox.join(" ")]] : []),
        ...(options.stroke ? [["stroke", options.stroke]] : []),
      ]
        .map(([name, value]) => `${name}="${value}"`)
        .join(" ")}>${data.components.map((component) => component.toSVG()).join("")}</svg>`,
    path: (...args) => wrap(path(data, ...args), options),
    rect: (...args) => wrap(rect(data, ...args), options),
  };
}

export function create(options: PictoOptions = {}): Picto {
  return wrap({ components: [] }, options);
}
