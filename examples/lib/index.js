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
        .group({ stroke: "transparent", fill: ["", "#e66", "#ea4", "#8d2"][level] }, (g) => g.repeat(level, (g, n) => g.rect({ x: -0.45, y: 0.35 - n * 0.45, width: 0.9, height: 0.35 })));
};
export const wifi = () => {
    const angle = 0.75;
    const height = 0.6;
    return create({
        viewBox: { x: -0.5, y: -0.5, width: 1, height: 1 },
        stroke: "black",
        fill: "black",
        strokeWidth: 0.075,
        lineCap: "round",
    })
        .repeat(3, (g, n) => g.arc({
        center: { x: 0, y: height / 2 },
        radius: height - (height / 3) * n,
        start: -angle,
        end: Math.PI + angle,
        counterclockwise: true,
    }))
        .circle({ center: { x: 0, y: height / 2 }, radius: 0.04 });
};
export const star = () => {
    const spikes = 5;
    const angle = (Math.PI * 2) / (spikes * 2);
    const point = (angle, length) => ({
        x: length * Math.cos(angle - Math.PI / 2),
        y: length * Math.sin(angle - Math.PI / 2),
    });
    return create({
        viewBox: { x: -100, y: -100, width: 200, height: 200 },
        stroke: "black",
        fill: "yellow",
        strokeWidth: 5,
        lineJoin: "round",
    }).path((p) => p
        .move(point(0, 90))
        .repeat(spikes, (p, n) => p.lineTo(point(angle * (n * 2 + 1), 40)).lineTo(point(angle * ((n + 1) * 2), 90)))
        .close());
};
//# sourceMappingURL=index.js.map