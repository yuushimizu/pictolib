import { XMLBuilder } from "fast-xml-parser";
import { svgRenderingAttributes } from "./picto-data.js";
import { create as createGroup } from "./group.js";
const buildSVGElement = ([name, attributes, children]) => ({
    [name]: [...(children ?? []).map(buildSVGElement)],
    ":@": Object.entries(attributes).reduce((attributes, [name, value]) => ({ ...attributes, [`@_${name}`]: String(value) }), {}),
});
const buildSVG = (rootGroup, { viewBox, ...restOptions }) => {
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
            rootGroup.components.map((component) => component.svg()),
        ]),
    ]))}`;
};
const wrap = (rootGroup, options) => {
    const manipulator = (f) => (...args) => wrap(f(...args), options);
    return {
        group: manipulator(rootGroup.group),
        path: manipulator(rootGroup.path),
        rect: manipulator(rootGroup.rect),
        circle: manipulator(rootGroup.circle),
        arc: manipulator(rootGroup.arc),
        mask: manipulator(rootGroup.mask),
        repeat: manipulator(rootGroup.repeat),
        svg: () => buildSVG(rootGroup, options),
    };
};
export const create = (options) => wrap(createGroup(), options ?? {});
//# sourceMappingURL=index.js.map