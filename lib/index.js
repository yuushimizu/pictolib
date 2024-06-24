import { path } from "./path.js";
function manipulator(f, data, options) {
    return (...args) => wrap(f(data, ...args), options);
}
function wrap(data, options) {
    return {
        toSVG: () => `<svg ${[
            ["xmlns", "http://www.w3.org/2000/svg"],
            ...(options.viewBox ? [["viewBox", options.viewBox.join(" ")]] : []),
            ...(options.stroke ? [["stroke", options.stroke]] : []),
        ]
            .map(([name, value]) => `${name}="${value}"`)
            .join(" ")}>${data.components.map((component) => component.toSVG()).join("")}</svg>`,
        path: manipulator(path, data, options),
    };
}
export function create(options = {}) {
    return wrap({ components: [] }, options);
}
//# sourceMappingURL=index.js.map