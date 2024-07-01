import { addComponent } from "./picto-data.js";
export const circle = (data, { center, radius, }) => addComponent(data, {
    svg: () => ["circle", { cx: center.x, cy: center.y, r: radius }],
});
//# sourceMappingURL=circle.js.map