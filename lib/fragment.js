import { emptyData, addComponent } from "./picto-data.js";
import { group } from "./group.js";
import { path } from "./path.js";
import { rect } from "./rect.js";
import { circle } from "./circle.js";
import { arc } from "./arc.js";
import { mask } from "./mask.js";
const repeat = (data, times, f) => [...Array(times).keys()].reduce((fragment, n) => f(fragment, n), wrap(data));
const fragment = (data, builder) => {
    const fragment = builder(create());
    return addComponent(data, {
        svg: () => fragment.svg(),
    });
};
const wrap = (data) => {
    const manipulator = (f) => (...args) => wrap(f(data, ...args));
    const newFragment = {
        fragment: manipulator(fragment),
        group: manipulator(group),
        path: manipulator(path),
        rect: manipulator(rect),
        circle: manipulator(circle),
        arc: manipulator(arc),
        mask: manipulator(mask),
        repeat: manipulator(repeat),
        components: data.components,
        svg: () => data.components.flatMap((component) => component.svg()),
    };
    return newFragment;
};
export const create = () => wrap(emptyData);
//# sourceMappingURL=fragment.js.map