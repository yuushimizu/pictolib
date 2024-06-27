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

const wrap = (rootGroup: PictoGroup, options: PictoOptions): Picto => ({
  group: (...args) => wrap(rootGroup.group(...args), options),
  path: (...args) => wrap(rootGroup.path(...args), options),
  rect: (...args) => wrap(rootGroup.rect(...args), options),
  toSVG: () =>
    `<svg ${[
      ["xmlns", "http://www.w3.org/2000/svg"],
      ...(options.viewBox ? [["viewBox", options.viewBox.join(" ")]] : []),
      ...(options.stroke ? [["stroke", options.stroke]] : []),
    ]
      .map(([name, value]) => `${name}="${value}"`)
      .join(" ")}>${rootGroup.components.map((component) => component.toSVG()).join("")}</svg>`,
});

export const create = (options: PictoOptions = {}): Picto => wrap(createGroup(), options);
