import { XMLBuilder } from "fast-xml-parser";
import { type Rect } from "./coord.js";
import { type SVGElement, svgRenderingAttributes } from "./picto-data.js";
import { type PictoGroup, type PictoGroupOptions, type GroupManipulators, create as createGroup } from "./group.js";

export type PictoOptions = PictoGroupOptions &
  Readonly<
    Partial<{
      viewBox: Rect;
    }>
  >;

type Manipulators = Readonly<{
  [K in keyof GroupManipulators]: (...args: Parameters<GroupManipulators[K]>) => Picto;
}>;

export type Picto = Manipulators &
  Readonly<{
    repeat: (...args: Parameters<PictoGroup["repeat"]>) => Picto;
    svg: () => string;
  }>;

type XMLBuilderElement = Readonly<{
  [key: string]: readonly XMLBuilderElement[] | Readonly<Record<string, string>>;
}>;

const buildSVGElement = ([name, attributes, children]: SVGElement): XMLBuilderElement => ({
  [name]: [...(children ?? []).map(buildSVGElement)],
  ":@": Object.entries(attributes).reduce(
    (attributes, [name, value]) => ({ ...attributes, [`@_${name}`]: String(value) }),
    {}
  ),
});

const buildSVG = (rootGroup: PictoGroup, { viewBox, ...restOptions }: PictoOptions): string => {
  return `<?xml version="1.0"?>${String(
    new XMLBuilder({ ignoreAttributes: false, preserveOrder: true }).build([
      buildSVGElement([
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          ...(viewBox ? { viewBox: [viewBox.x, viewBox.y, viewBox.width, viewBox.height].join(" ") } : {}),
          ...svgRenderingAttributes(restOptions),
        },
        rootGroup.data.components.map((component) => component.svg()),
      ]),
    ])
  )}`;
};

const wrap = (rootGroup: PictoGroup, options: PictoOptions): Picto => {
  const manipulator =
    <F extends (...args: A) => PictoGroup, A extends readonly unknown[] = Parameters<F>>(f: F) =>
    (...args: A) =>
      wrap(f(...args), options);
  return {
    group: manipulator(rootGroup.group),
    path: manipulator(rootGroup.path),
    rect: manipulator(rootGroup.rect),
    circle: manipulator(rootGroup.circle),
    arc: manipulator(rootGroup.arc),
    repeat: manipulator(rootGroup.repeat),
    svg: () => buildSVG(rootGroup, options),
  };
};

export const create = (options: PictoOptions | undefined = undefined): Picto => wrap(createGroup(), options ?? {});
