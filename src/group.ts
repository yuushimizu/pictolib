import {
  type PictoData,
  type RenderingAttributes,
  emptyData,
  addComponent,
  svgRenderingAttributes,
} from "./picto-data.js";
import { path } from "./path.js";
import { rect } from "./rect.js";
import { circle } from "./circle.js";
import { arc } from "./arc.js";

export type PictoGroupOptions = RenderingAttributes;

type ManipulatorFunctions = Readonly<{
  group: typeof group;
  path: typeof path;
  rect: typeof rect;
  circle: typeof circle;
  arc: typeof arc;
}>;

export type GroupManipulators = Readonly<{
  [K in keyof ManipulatorFunctions]: (
    ...args: Parameters<ManipulatorFunctions[K]> extends readonly [PictoData, ...infer R] ? R : never
  ) => PictoGroup;
}>;

export type PictoGroup = GroupManipulators &
  Readonly<{
    data: PictoData;
    repeat: (times: number, f: (group: PictoGroup, n: number) => PictoGroup) => PictoGroup;
  }>;

const group = (data: PictoData, options: PictoGroupOptions, builder: (group: PictoGroup) => PictoGroup): PictoData => {
  const group = builder(create());
  return addComponent(data, {
    svg: () => ["g", svgRenderingAttributes(options), group.data.components.map((component) => component.svg())],
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

export const create = (options?: PictoGroupOptions): PictoGroup => wrap(emptyData, options ?? {});
