import { path } from "./path.js";
import { rect } from "./rect.js";
function wrap(data, options) {
    return {
        toSVG: () => `<svg ${[
            ["xmlns", "http://www.w3.org/2000/svg"],
            ...(options.viewBox ? [["viewBox", options.viewBox.join(" ")]] : []),
            ...(options.stroke ? [["stroke", options.stroke]] : []),
        ]
            .map(([name, value]) => `${name}="${value}"`)
            .join(" ")}>${data.components.map((component) => component.toSVG()).join("")}</svg>`,
        path: (...args) => wrap(path(data, ...args), options),
        rect: (...args) => wrap(rect(data, ...args), options),
    };
}
function wrapGroup(data, options) {
    return {
        toSVG: () => `<svg ${[
            ["xmlns", "http://www.w3.org/2000/svg"],
            ...(options.viewBox ? [["viewBox", options.viewBox.join(" ")]] : []),
            ...(options.stroke ? [["stroke", options.stroke]] : []),
        ]
            .map(([name, value]) => `${name}="${value}"`)
            .join(" ")}>${data.components.map((component) => component.toSVG()).join("")}</svg>`,
        path: (...args) => wrap(path(data, ...args), options),
        rect: (...args) => wrap(rect(data, ...args), options),
    };
}
export function create(options = {}) {
    return wrap({ components: [] }, options);
}
//# sourceMappingURL=index.js.map