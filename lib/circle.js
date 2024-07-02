import { addComponent, svgShapeStrokePresentationAttributes, } from "./picto-data.js";
export const circle = (data, { center, radius, ...restParams }) => addComponent(data, {
    svg: () => [
        ["circle", { cx: center.x, cy: center.y, r: radius, ...svgShapeStrokePresentationAttributes(restParams) }],
    ],
});
//# sourceMappingURL=circle.js.map