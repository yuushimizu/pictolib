import { emptyData, addComponent } from "./picto-data.js";
import { path } from "./path.js";
import { rect } from "./rect.js";
import { circle } from "./circle.js";
import { arc } from "./arc.js";
const group = (data, options, builder) => {
    const group = builder(create());
    return addComponent(data, {
        type: "group",
        options,
        components: group.data.components,
    });
};
const wrap = (data, options) => {
    const manipulator = (f) => (...args) => wrap(f(data, ...args), options);
    return {
        group: manipulator(group),
        path: manipulator(path),
        rect: manipulator(rect),
        circle: manipulator(circle),
        arc: manipulator(arc),
        data,
    };
};
export const create = (options = undefined) => wrap(emptyData, options ?? {});
//# sourceMappingURL=group.js.map