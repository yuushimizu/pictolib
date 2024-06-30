import { addComponent } from "./picto-data.js";
const moveLine = (type, command, point) => ({
    ...point,
    type,
    d: `${command}${String(point.x)},${String(point.y)}`,
});
const createBuilder = (commands) => ({
    commands,
    move: (point) => createBuilder([...commands, moveLine("moveBy", "m", point)]),
    moveTo: (point) => createBuilder([...commands, moveLine("moveTo", "M", point)]),
    line: (point) => createBuilder([...commands, moveLine("lineBy", "l", point)]),
    lineTo: (point) => createBuilder([...commands, moveLine("lineTo", "L", point)]),
});
export const path = (data, build) => {
    const commands = build(createBuilder([])).commands;
    return addComponent(data, {
        type: "path",
        d: commands.map((command) => command.d).join(" "),
    });
};
//# sourceMappingURL=path.js.map