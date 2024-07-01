import { addComponent, svgRenderingAttributes } from "./picto-data.js";
export const rect = (data, { x, y, width, height, round, ...restParams }) => addComponent(data, {
    svg: () => [
        "rect",
        {
            x,
            y,
            width,
            height,
            ...(round == undefined
                ? {}
                : typeof round === "number"
                    ? { rx: round, ry: round }
                    : {
                        ...(round.x == undefined ? {} : { rx: round.x }),
                        ...(round.y == undefined ? {} : { ry: round.y }),
                    }),
            ...svgRenderingAttributes(restParams),
        },
    ],
});
//# sourceMappingURL=rect.js.map