import { addComponent, svgShapeStrokePresentationAttributes, } from "./picto-data.js";
import { normalizeAngle } from "./coord.js";
export const arc = (data, { center, radius, start, end, counterclockwise, ...restParams }) => {
    const { x: xRadius, y: yRadius } = typeof radius === "number" ? { x: radius, y: radius } : radius;
    return addComponent(data, {
        svg: () => [
            [
                "path",
                {
                    d: [
                        ["M", [center.x + xRadius * Math.cos(start), center.y + yRadius * Math.sin(start)]],
                        [
                            "A",
                            [
                                xRadius,
                                yRadius,
                                0,
                                normalizeAngle(counterclockwise ? start - end : end - start) > Math.PI ? 1 : 0,
                                counterclockwise ? 0 : 1,
                                center.x + xRadius * Math.cos(end),
                                center.y + yRadius * Math.sin(end),
                            ],
                        ],
                    ]
                        .map(([command, args]) => `${command}${args.join(",")}`)
                        .join(" "),
                    ...svgShapeStrokePresentationAttributes(restParams),
                },
            ],
        ],
    });
};
//# sourceMappingURL=arc.js.map