import {
  type PictoGroup,
  type PictoGroupOptions,
  type PictoGroupManipulators,
  type PictoComponent,
  create as createGroup,
} from "./group.js";
import { type Rect } from "./coord.js";

export { type PictoComponent, type PictoGroupOptions } from "./group.js";

export type PictoOptions = PictoGroupOptions &
  Readonly<{
    viewBox?: Rect | undefined;
  }>;

type Manipulators = Readonly<{
  [K in keyof PictoGroupManipulators]: (...args: Parameters<PictoGroupManipulators[K]>) => Picto;
}>;

export type Picto = Manipulators &
  Readonly<{
    options: PictoOptions;
    components: readonly PictoComponent[];
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
    options,
    components: rootGroup.data.components,
  };
};

export const create = (options: PictoOptions | undefined = undefined): Picto => wrap(createGroup(), options ?? {});
