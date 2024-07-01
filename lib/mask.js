import { v4 as uuidv4 } from "uuid";
import { addComponent } from "./picto-data.js";
import { create as createFragment } from "./fragment.js";
export const mask = (data, mask, applied) => {
    const id = uuidv4();
    const maskFragment = mask(createFragment());
    const appliedFragment = applied(createFragment());
    return addComponent(data, {
        svg: () => [
            ["mask", { id }, maskFragment.svg()],
            ["g", { mask: `url(#${id})` }, appliedFragment.svg()],
        ],
    });
};
//# sourceMappingURL=mask.js.map