import { create } from "pictolib";
export const battery = (level) => {
    const lineColor = level === 0 ? "#aaa" : "#222";
    return create({
        viewBox: { x: -1, y: -1, width: 2, height: 2 },
        stroke: lineColor,
        fill: "transparent",
        strokeWidth: 0.1,
    })
        .group({ fill: lineColor }, (g) => g.rect({ x: -0.24, y: -0.85, width: 0.48, height: 0.1 }))
        .rect({ x: -0.6, y: -0.7, width: 1.2, height: 1.55, round: 0.1 })
        .group({ stroke: "transparent", fill: ["", "#e66", "#ea4", "#8d2"][level] }, (g) => [...Array(level).keys()].reduce((g, i) => g.rect({ x: -0.45, y: 0.35 - i * 0.45, width: 0.9, height: 0.35 }), g));
};
//# sourceMappingURL=index.js.map