import { addComponent, svgShapeStrokePresentationAttributes, } from "./picto-data.js";
const moveLine = (command, { x, y }) => ({
    d: `${command}${String(x)},${String(y)}`,
});
const hvLine = (command, arg) => ({
    d: `${command}${String(arg)}`,
});
const curve = (command, ...[point1, point2, point3]) => ({
    d: `${point3 ? command[1] : command[0]}${[point1, point2, ...(point3 ? [point3] : [])]
        .flatMap(({ x, y }) => [x, y])
        .join(",")}`,
});
const arc = (command, ...[end, { radius, rotation, largeArc, counterclockwise }]) => {
    const { x: xRadius, y: yRadius } = typeof radius === "number" ? { x: radius, y: radius } : radius;
    return {
        d: `${command}${[xRadius, yRadius, rotation ?? 0, largeArc ? 1 : 0, counterclockwise ? 0 : 1, end.x, end.y].join(",")}`,
    };
};
const createBuilder = (commands) => {
    const add = (command) => createBuilder([...commands, command]);
    const builder = {
        commands,
        move: (point) => add(moveLine("m", point)),
        moveTo: (point) => add(moveLine("M", point)),
        line: (point) => add(moveLine("l", point)),
        lineTo: (point) => add(moveLine("L", point)),
        hLine: (length) => add(hvLine("h", length)),
        hLineTo: (x) => add(hvLine("H", x)),
        vLine: (length) => add(hvLine("v", length)),
        vLineTo: (y) => add(hvLine("V", y)),
        curve: (...args) => add(curve(["q", "c"], ...args)),
        curveTo: (...args) => add(curve(["Q", "C"], ...args)),
        arc: (...args) => add(arc("a", ...args)),
        arcTo: (...args) => add(arc("A", ...args)),
        close: () => add({ d: "Z" }),
        repeat: (times, f) => [...Array(times).keys()].reduce((builder, n) => f(builder, n), builder),
    };
    return builder;
};
export const path = (data, params, build) => {
    const commands = build(createBuilder([])).commands;
    return addComponent(data, {
        svg: () => [
            ["path", { d: commands.map((command) => command.d).join(" "), ...svgShapeStrokePresentationAttributes(params) }],
        ],
    });
};
//# sourceMappingURL=path.js.map