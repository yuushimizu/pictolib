import { create as createGroup, } from "./group.js";
const wrap = (rootGroup, options) => {
    const manipulator = (f) => (...args) => wrap(f(...args), options);
    return {
        group: manipulator(rootGroup.group),
        path: manipulator(rootGroup.path),
        rect: manipulator(rootGroup.rect),
        toSVG: () => `<svg ${[
            ["xmlns", "http://www.w3.org/2000/svg"],
            ...(options.viewBox ? [["viewBox", options.viewBox.join(" ")]] : []),
            ...(options.stroke ? [["stroke", options.stroke]] : []),
        ]
            .map(([name, value]) => `${name}="${value}"`)
            .join(" ")}>${rootGroup.components.map((component) => component.toSVG()).join("")}</svg>`,
    };
};
export const create = (options = {}) => wrap(createGroup(), options);
//# sourceMappingURL=index.js.map