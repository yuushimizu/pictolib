import { addComponent } from "./picto-data.js";
import { normalizeAngle } from "./coord.js";
export const arc = (data, { center, radius, start, end, counterclockwise, }) => addComponent(data, {
    svg: () => [
        "path",
        {
            d: `M ${String(center.x + radius * Math.cos(start))},${String(center.y + radius * Math.sin(start))} A ${String(radius)},${String(radius)},0,${String(normalizeAngle(counterclockwise ?? true ? start - end : end - start) > Math.PI ? 1 : 0)},${String(counterclockwise ?? true ? 0 : 1)},${String(center.x + radius * Math.cos(end))},${String(center.y + radius * Math.sin(end))}`,
        },
    ],
});
//# sourceMappingURL=arc.js.map