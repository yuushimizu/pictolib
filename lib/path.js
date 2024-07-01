import { addComponent, svgRenderingAttributes } from "./picto-data.js";
const moveLine = (command, { x, y }) => ({
    d: `${command}${String(x)},${String(y)}`,
});
const createBuilder = (commands) => {
    const add = (command) => createBuilder([...commands, command]);
    const builder = {
        commands,
        move: (point) => add(moveLine("m", point)),
        moveTo: (point) => add(moveLine("M", point)),
        line: (point) => add(moveLine("l", point)),
        lineTo: (point) => add(moveLine("L", point)),
        close: () => add({ d: "Z" }),
        repeat: (times, f) => [...Array(times).keys()].reduce((builder, n) => f(builder, n), builder),
    };
    return builder;
};
export const path = (data, params, build) => {
    const commands = build(createBuilder([])).commands;
    return addComponent(data, {
        svg: () => ["path", { d: commands.map((command) => command.d).join(" "), ...svgRenderingAttributes(params) }],
    });
};
//# sourceMappingURL=path.js.map