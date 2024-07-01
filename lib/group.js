import { emptyData, addComponent } from "./picto-data.js";
import { path } from "./path.js";
import { rect } from "./rect.js";
import { circle } from "./circle.js";
import { arc } from "./arc.js";
export const groupOptionsSVGAttributes = (options) => {
    const attribute = (key, value, f = String) => value != undefined ? { [key]: f(value) } : {};
    return {
        ...attribute("stroke", options.stroke),
        ...attribute("fill", options.fill),
        ...attribute("stroke-width", options.strokeWidth),
        ...attribute("stroke-linecap", options.lineCap),
        ...attribute("stroke-linejoin", options.lineJoin),
    };
};
const group = (data, options, builder) => {
    const group = builder(create());
    return addComponent(data, {
        svg: () => ["g", groupOptionsSVGAttributes(options), group.data.components.map((component) => component.svg())],
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