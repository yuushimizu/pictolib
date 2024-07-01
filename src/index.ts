import { XMLBuilder } from "fast-xml-parser";
import { type Rect } from "./coord.js";
import { type RenderingAttributes, type SVGElement, svgRenderingAttributes } from "./picto-data.js";
import { type PictoFragment, type FragmentManipulators, create as createGroup } from "./fragment.js";

export { type PictoFragment } from "./fragment.js";

export type PictoOptions = RenderingAttributes &
  Readonly<
    Partial<{
      viewBox: Rect;
    }>
  >;

type Manipulators = Readonly<{
  [K in keyof FragmentManipulators]: (...args: Parameters<FragmentManipulators[K]>) => Picto;
}>;

export type Picto = Manipulators &
  Readonly<{
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

const buildSVG = (root: PictoFragment, { viewBox, ...restOptions }: PictoOptions): string => {
  return `<?xml version="1.0"?>${String(
    new XMLBuilder({ ignoreAttributes: false, preserveOrder: true }).build([
      buildSVGElement([
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          ...(viewBox
            ? { viewBox: [viewBox.origin.x, viewBox.origin.y, viewBox.size.width, viewBox.size.height].join(" ") }
            : {}),
          ...svgRenderingAttributes(restOptions),
        },
        root.svg(),
      ]),
    ])
  )}`;
};

const wrap = (root: PictoFragment, options: PictoOptions): Picto => {
  const manipulator =
    <F extends (...args: A) => PictoFragment, A extends readonly unknown[] = Parameters<F>>(f: F) =>
    (...args: A) =>
      wrap(f(...args), options);
  return {
    fragment: manipulator(root.fragment),
    group: manipulator(root.group),
    path: manipulator(root.path),
    rect: manipulator(root.rect),
    circle: manipulator(root.circle),
    arc: manipulator(root.arc),
    mask: manipulator(root.mask),
    repeat: manipulator(root.repeat),
    svg: () => buildSVG(root, options),
  };
};

export const create = (options?: PictoOptions): Picto => wrap(createGroup(), options ?? {});
