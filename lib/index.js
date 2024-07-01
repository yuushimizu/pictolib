import { XMLBuilder } from "fast-xml-parser";
import { svgRenderingAttributes } from "./picto-data.js";
import { create as createGroup } from "./fragment.js";
const buildSVGElement = ([name, attributes, children]) => ({
    [name]: [...(children ?? []).map(buildSVGElement)],
    ":@": Object.entries(attributes).reduce((attributes, [name, value]) => ({ ...attributes, [`@_${name}`]: String(value) }), {}),
});
const buildSVG = (root, { viewBox, ...restOptions }) => {
    return `<?xml version="1.0"?>${String(new XMLBuilder({ ignoreAttributes: false, preserveOrder: true }).build([
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
    ]))}`;
};
const wrap = (root, options) => {
    const manipulator = (f) => (...args) => wrap(f(...args), options);
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
export const create = (options) => wrap(createGroup(), options ?? {});
//# sourceMappingURL=index.js.map