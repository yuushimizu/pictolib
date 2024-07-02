import { type PictoData, type PictoComponent, type SVGElement, emptyData, addComponent } from "./picto-data.js";
import { group } from "./group.js";
import { path } from "./path.js";
import { rect } from "./rect.js";
import { circle } from "./circle.js";
import { ellipse } from "./ellipse.js";
import { arc } from "./arc.js";
import { mask } from "./mask.js";

const repeat = (data: PictoData, times: number, f: (fragment: PictoFragment, n: number) => PictoFragment) =>
  [...Array(times).keys()].reduce((fragment, n) => f(fragment, n), wrap(data));

type ManipulatorFunctions = Readonly<{
  fragment: typeof fragment;
  group: typeof group;
  path: typeof path;
  rect: typeof rect;
  circle: typeof circle;
  ellipse: typeof ellipse;
  arc: typeof arc;
  mask: typeof mask;
  repeat: typeof repeat;
}>;

export type FragmentManipulators = Readonly<{
  [K in keyof ManipulatorFunctions]: (
    ...args: Parameters<ManipulatorFunctions[K]> extends readonly [PictoData, ...infer R] ? R : never
  ) => PictoFragment;
}>;

export type PictoFragment = FragmentManipulators &
  Readonly<{
    repeat: (times: number, f: (fragment: PictoFragment, n: number) => PictoFragment) => PictoFragment;
    components: readonly PictoComponent[];
    svg: () => readonly SVGElement[];
  }>;

const fragment = (data: PictoData, builder: (fragment: PictoFragment) => PictoFragment): PictoData => {
  const fragment = builder(create());
  return addComponent(data, {
    svg: () => fragment.svg(),
  });
};

const wrap = (data: PictoData): PictoFragment => {
  const manipulator =
    <
      F extends (data: PictoData, ...args: A) => PictoData,
      A extends readonly unknown[] = Parameters<F> extends [PictoData, ...infer R] ? R : never
    >(
      f: F
    ) =>
    (...args: A) =>
      wrap(f(data, ...args));
  const newFragment: PictoFragment = {
    fragment: manipulator(fragment),
    group: manipulator(group),
    path: manipulator(path),
    rect: manipulator(rect),
    circle: manipulator(circle),
    ellipse: manipulator(ellipse),
    arc: manipulator(arc),
    mask: manipulator(mask),
    repeat: manipulator(repeat),
    components: data.components,
    svg: () => data.components.flatMap((component) => component.svg()),
  };
  return newFragment;
};

export const create = (): PictoFragment => wrap(emptyData);
