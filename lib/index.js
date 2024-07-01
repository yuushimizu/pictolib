import { XMLBuilder } from "fast-xml-parser";
import { create as createGroup, groupOptionsSVGAttributes, } from "./group.js";
const buildSVGElement = ([name, attributes, children]) => ({
    [name]: [...(children ?? []).map(buildSVGElement)],
    ":@": Object.entries(attributes).reduce((attributes, [name, value]) => ({ ...attributes, [`@_${name}`]: String(value) }), {}),
});
const buildSVG = (rootGroup, options) => {
    const viewBox = options.viewBox;
    return `<?xml version="1.0"?>${String(new XMLBuilder({ ignoreAttributes: false, preserveOrder: true }).build([
        buildSVGElement([
            "svg",
            {
                xmlns: "http://www.w3.org/2000/svg",
                ...(viewBox ? { viewBox: [viewBox.x, viewBox.y, viewBox.width, viewBox.height].join(" ") } : {}),
                ...groupOptionsSVGAttributes(options),
            },
            rootGroup.data.components.map((component) => component.svg()),
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
        repeat: manipulator(rootGroup.repeat),
        svg: () => buildSVG(rootGroup, options),
    };
};
export const create = (options = undefined) => wrap(createGroup(), options ?? {});
//# sourceMappingURL=index.js.map