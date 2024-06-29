import { type PictoData, type PictoComponentConstraint, emptyData } from "./picto-data.js";
import { type PathComponent, path } from "./path.js";
import { type RectComponent, rect } from "./rect.js";

export type PictoGroupOptions = Readonly<{
  stroke?: string | undefined;
  fill?: string | undefined;
  strokeWidth?: number | undefined;
}>;

export type PictoComponent = PictoComponentConstraint & (PathComponent | RectComponent | GroupComponent);

type ManipulatorFunctions = Readonly<{
  group: typeof group;
  path: typeof path<PictoComponent>;
  rect: typeof rect<PictoComponent>;
}>;

export type PictoGroupManipulators = Readonly<{
  [K in keyof ManipulatorFunctions]: (
    ...args: Parameters<ManipulatorFunctions[K]> extends readonly [PictoData<PictoComponent>, ...infer R] ? R : never
  ) => PictoGroup;
}>;

export type PictoGroup = PictoGroupManipulators &
  Readonly<{
    data: PictoData<PictoComponent>;
  }>;

export type GroupComponent = Readonly<{
  type: "group";
  options: PictoGroupOptions;
  components: readonly PictoComponent[];
}>;

const group = (
  data: PictoData<PictoComponent>,
  options: PictoGroupOptions,
  builder: (group: PictoGroup) => PictoGroup
): PictoData<PictoComponent> => {
  const group = builder(create());
  return {
    ...data,
    components: [
      ...data.components,
      {
        type: "group",
        options,
        components: group.data.components,
      },
    ],
  };
};

const wrap = (data: PictoData<PictoComponent>, options: PictoGroupOptions): PictoGroup => {
  const manipulator =
    <
      F extends (data: PictoData<PictoComponent>, ...args: A) => PictoData<PictoComponent>,
      A extends readonly unknown[] = Parameters<F> extends [PictoData<PictoComponent>, ...infer R] ? R : never
    >(
      f: F
    ) =>
    (...args: A) =>
      wrap(f(data, ...args), options);
  return {
    group: manipulator(group),
    path: manipulator(path),
    rect: manipulator(rect),
    data,
  };
};

export const create = (options: PictoGroupOptions | undefined = undefined): PictoGroup =>
  wrap(emptyData, options ?? {});
