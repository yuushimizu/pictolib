import { type PictoData, type SVGAttributes, emptyData, addComponent } from "./picto-data.js";
import { path } from "./path.js";
import { rect } from "./rect.js";
import { circle } from "./circle.js";
import { arc } from "./arc.js";

export type PictoGroupOptions = Readonly<
  Partial<{
    stroke: string;
    fill: string;
    strokeWidth: number;
    lineCap: string;
    lineJoin: string;
  }>
>;

type ManipulatorFunctions = Readonly<{
  group: typeof group;
  path: typeof path;
  rect: typeof rect;
  circle: typeof circle;
  arc: typeof arc;
}>;

export type PictoGroupManipulators = Readonly<{
  [K in keyof ManipulatorFunctions]: (
    ...args: Parameters<ManipulatorFunctions[K]> extends readonly [PictoData, ...infer R] ? R : never
  ) => PictoGroup;
}>;

export type PictoGroup = PictoGroupManipulators &
  Readonly<{
    data: PictoData;
    repeat: (times: number, f: (group: PictoGroup, n: number) => PictoGroup) => PictoGroup;
  }>;

export const groupOptionsSVGAttributes = (options: PictoGroupOptions): SVGAttributes => {
  const attribute = <T>(key: string, value: T | undefined, f: (value: T) => string | number = String) =>
    value != undefined ? { [key]: f(value) } : {};
  return {
    ...attribute("stroke", options.stroke),
    ...attribute("fill", options.fill),
    ...attribute("stroke-width", options.strokeWidth),
    ...attribute("stroke-linecap", options.lineCap),
    ...attribute("stroke-linejoin", options.lineJoin),
  };
};

const group = (data: PictoData, options: PictoGroupOptions, builder: (group: PictoGroup) => PictoGroup): PictoData => {
  const group = builder(create());
  return addComponent(data, {
    svg: () => ["g", groupOptionsSVGAttributes(options), group.data.components.map((component) => component.svg())],
  });
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
  const newGroup: PictoGroup = {
    group: manipulator(group),
    path: manipulator(path),
    rect: manipulator(rect),
    circle: manipulator(circle),
    arc: manipulator(arc),
    repeat: (times, f) => [...Array(times).keys()].reduce((group, n) => f(group, n), newGroup),
    data,
  };
  return newGroup;
};

export const create = (options: PictoGroupOptions | undefined = undefined): PictoGroup =>
  wrap(emptyData, options ?? {});
