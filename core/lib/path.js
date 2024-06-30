import { addComponent } from "./picto-data.js";
const moveLine = (command, point) => ({
    d: `${command}${String(point.x)},${String(point.y)}`,
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
export const path = (data, build) => {
    const commands = build(createBuilder([])).commands;
    return addComponent(data, {
        type: "path",
        d: commands.map((command) => command.d).join(" "),
    });
};
//# sourceMappingURL=path.js.map