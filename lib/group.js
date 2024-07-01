import { emptyData, addComponent, svgRenderingAttributes, } from "./picto-data.js";
import { path } from "./path.js";
import { rect } from "./rect.js";
import { circle } from "./circle.js";
import { arc } from "./arc.js";
import { mask } from "./mask.js";
const group = (data, options, builder) => {
    const group = builder(create());
    return addComponent(data, {
        svg: () => ["g", svgRenderingAttributes(options), group.components.map((component) => component.svg())],
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
        mask: manipulator(mask),
        repeat: (times, f) => [...Array(times).keys()].reduce((group, n) => f(group, n), newGroup),
        components: data.components,
    };
    return newGroup;
};
export const create = (options) => wrap(emptyData, options ?? {});
//# sourceMappingURL=group.js.map