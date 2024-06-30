import { addComponent } from "./picto-data.js";
export const arc = (data, params) => addComponent(data, {
    ...params,
    type: "arc",
    counterclockwise: params.counterclockwise ?? true,
});
//# sourceMappingURL=arc.js.map