import { create as createGroup, } from "./group.js";
export * from "./coord.js";
const wrap = (rootGroup, options) => {
    const manipulator = (f) => (...args) => wrap(f(...args), options);
    return {
        group: manipulator(rootGroup.group),
        path: manipulator(rootGroup.path),
        rect: manipulator(rootGroup.rect),
        circle: manipulator(rootGroup.circle),
        arc: manipulator(rootGroup.arc),
        options,
        components: rootGroup.data.components,
    };
};
export const create = (options = undefined) => wrap(createGroup(), options ?? {});
//# sourceMappingURL=index.js.map