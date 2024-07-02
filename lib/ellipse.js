import { addComponent, svgShapeStrokePresentationAttributes, } from "./picto-data.js";
export const ellipse = (data, { center, radius, ...restParams }) => {
    const { x: xRadius, y: yRadius } = typeof radius === "number" ? { x: radius, y: radius } : radius;
    return addComponent(data, {
        svg: () => [
            [
                "ellipse",
                {
                    cx: center.x,
                    cy: center.y,
                    rx: xRadius,
                    ry: yRadius,
                    ...svgShapeStrokePresentationAttributes(restParams),
                },
            ],
        ],
    });
};
//# sourceMappingURL=ellipse.js.map