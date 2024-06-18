import { path } from "./path.js";
function manipulator(f, data) {
    return (...args) => wrap(f(data, ...args));
}
function wrap(data) {
    return {
        toSVG: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g stroke="black">${data.components
            .map((component) => component.toSVG())
            .join("")}</g></svg>`,
        path: manipulator(path, data),
    };
}
export function create() {
    return wrap({ components: [] });
}
//# sourceMappingURL=index.js.map