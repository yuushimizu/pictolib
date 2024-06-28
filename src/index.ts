import {
  type PictoGroup,
  type PictoGroupOptions,
  type PictoGroupManipulators,
  create as createGroup,
} from "./group.js";

type PictoOptions = PictoGroupOptions &
  Readonly<{
    viewBox?: readonly [number, number, number, number] | undefined;
  }>;

type Manipulators = Readonly<{
  [K in keyof PictoGroupManipulators]: (...args: Parameters<PictoGroupManipulators[K]>) => Picto;
}>;

export type Picto = Manipulators &
  Readonly<{
    toSVG: () => string;
  }>;

const wrap = (rootGroup: PictoGroup, options: PictoOptions): Picto => {
  const manipulator =
    <F extends (...args: A) => PictoGroup, A extends readonly unknown[] = Parameters<F>>(f: F) =>
    (...args: A) =>
      wrap(f(...args), options);
  return {
    group: manipulator(rootGroup.group),
    path: manipulator(rootGroup.path),
    rect: manipulator(rootGroup.rect),
    toSVG: () =>
      `<svg ${[
        ["xmlns", "http://www.w3.org/2000/svg"],
        ...(options.viewBox ? [["viewBox", options.viewBox.join(" ")]] : []),
        ...(options.stroke ? [["stroke", options.stroke]] : []),
      ]
        .map(([name, value]) => `${name}="${value}"`)
        .join(" ")}>${rootGroup.components.map((component) => component.toSVG()).join("")}</svg>`,
  };
};

export const create = (options: PictoOptions = {}): Picto => wrap(createGroup(), options);
