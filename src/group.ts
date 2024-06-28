import { type PictoData, type PictoComponent, emptyData } from "./picto-data.js";
import { path } from "./path.js";
import { rect } from "./rect.js";

export type PictoGroupOptions = Readonly<{
  stroke?: string | undefined;
}>;

type ManipulatorFunctions = Readonly<{
  group: typeof group;
  path: typeof path;
  rect: typeof rect;
}>;

export type PictoGroupManipulators = Readonly<{
  [K in keyof ManipulatorFunctions]: (
    ...args: Parameters<ManipulatorFunctions[K]> extends readonly [PictoData, ...infer R] ? R : never
  ) => PictoGroup;
}>;

export type PictoGroup = PictoGroupManipulators &
  Readonly<{
    components: readonly PictoComponent[];
  }>;

const group = (data: PictoData, options: PictoGroupOptions, builder: (group: PictoGroup) => PictoGroup): PictoData => {
  const group = builder(create());
  return {
    ...data,
    components: [
      ...data.components,
      {
        toSVG: () =>
          `<g ${(options.stroke ? [["stroke", options.stroke]] : [])
            .map(([name, value]) => `${name}="${value}"`)
            .join(" ")}>${group.components.map((component) => component.toSVG()).join("")}</g>`,
      },
    ],
  };
};

const wrap = (data: PictoData, options: PictoGroupOptions): PictoGroup => {
  const manipulator =
    <
      F extends (data: PictoData, ...args: A) => PictoData,
      A extends readonly unknown[] = Parameters<F> extends [PictoData, ...infer R] ? R : never
    >(
      f: F
    ) =>
    (...args: A) =>
      wrap(f(data, ...args), options);
  return {
    group: manipulator(group),
    path: manipulator(path),
    rect: manipulator(rect),
    components: data.components,
  };
};

export const create = (options: PictoGroupOptions = {}): PictoGroup => wrap(emptyData, options);
