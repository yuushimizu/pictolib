import { addComponent, svgPresentationAttributes } from "./picto-data.js";
import { create as createFragment } from "./fragment.js";
export const group = (data, options, builder) => {
    const fragment = builder(createFragment());
    return addComponent(data, {
        svg: () => [["g", svgPresentationAttributes(options), fragment.svg()]],
    });
};
//# sourceMappingURL=group.js.map