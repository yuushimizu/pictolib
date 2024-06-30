import { addComponent } from "./picto-data.js";
export const rect = (data, { round, ...params }) => addComponent(data, {
    ...params,
    type: "rect",
    round: typeof round === "number" ? { x: round, y: round } : round,
});
//# sourceMappingURL=rect.js.map