import { create as createGroup, } from "./group.js";
const wrap = (rootGroup, options) => ({
    group: (...args) => wrap(rootGroup.group(...args), options),
    path: (...args) => wrap(rootGroup.path(...args), options),
    rect: (...args) => wrap(rootGroup.rect(...args), options),
    toSVG: () => `<svg ${[
        ["xmlns", "http://www.w3.org/2000/svg"],
        ...(options.viewBox ? [["viewBox", options.viewBox.join(" ")]] : []),
        ...(options.stroke ? [["stroke", options.stroke]] : []),
    ]
        .map(([name, value]) => `${name}="${value}"`)
        .join(" ")}>${rootGroup.components.map((component) => component.toSVG()).join("")}</svg>`,
});
export const create = (options = {}) => wrap(createGroup(), options);
//# sourceMappingURL=index.js.map