import { emptyData, addComponent, svgRenderingAttributes, } from "./picto-data.js";
import { path } from "./path.js";
import { rect } from "./rect.js";
import { circle } from "./circle.js";
import { arc } from "./arc.js";
const group = (data, options, builder) => {
    const group = builder(create());
    return addComponent(data, {
        svg: () => ["g", svgRenderingAttributes(options), group.data.components.map((component) => component.svg())],
    });
};
const wrap = (data, options) => {
    const manipulator = (f) => (...args) => wrap(f(data, ...args), options);
    const newGroup = {
        group: manipulator(group),
        path: manipulator(path),
        rect: manipulator(rect),
        circle: manipulator(circle),
        arc: manipulator(arc),
        repeat: (times, f) => [...Array(times).keys()].reduce((group, n) => f(group, n), newGroup),
        data,
    };
    return newGroup;
};
export const create = (options = undefined) => wrap(emptyData, options ?? {});
//# sourceMappingURL=group.js.map