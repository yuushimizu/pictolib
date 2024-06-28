import { emptyData } from "./picto-data.js";
import { path } from "./path.js";
import { rect } from "./rect.js";
const group = (data, options, builder) => {
    const group = builder(create());
    return {
        ...data,
        components: [
            ...data.components,
            {
                toSVG: () => `<g ${(options.stroke ? [["stroke", options.stroke]] : [])
                    .map(([name, value]) => `${name}="${value}"`)
                    .join(" ")}>${group.components.map((component) => component.toSVG()).join("")}</g>`,
            },
        ],
    };
};
const wrap = (data, options) => {
    const manipulator = (f) => (...args) => wrap(f(data, ...args), options);
    return {
        group: manipulator(group),
        path: manipulator(path),
        rect: manipulator(rect),
        components: data.components,
    };
};
export const create = (options = {}) => wrap(emptyData, options);
//# sourceMappingURL=group.js.map