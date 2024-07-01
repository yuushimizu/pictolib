import { addComponent, svgRenderingAttributes } from "./picto-data.js";
export const circle = (data, { center, radius, ...restParams }) => addComponent(data, {
    svg: () => [["circle", { cx: center.x, cy: center.y, r: radius, ...svgRenderingAttributes(restParams) }]],
});
//# sourceMappingURL=circle.js.map