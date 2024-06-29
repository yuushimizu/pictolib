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
                type: "group",
                options,
                components: group.data.components,
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
        data,
    };
};
export const create = (options = {}) => wrap(emptyData, options);
//# sourceMappingURL=group.js.map