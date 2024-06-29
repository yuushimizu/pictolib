const moveLine = (type, command, x, y) => ({
    type,
    x,
    y,
    d: `${command}${String(x)},${String(y)}`,
});
const createBuilder = (commands) => ({
    commands,
    move: (x, y) => createBuilder([...commands, moveLine("moveBy", "m", x, y)]),
    moveTo: (x, y) => createBuilder([...commands, moveLine("moveTo", "M", x, y)]),
    line: (x, y) => createBuilder([...commands, moveLine("lineBy", "l", x, y)]),
    lineTo: (x, y) => createBuilder([...commands, moveLine("lineTo", "L", x, y)]),
});
export const path = (data, build) => {
    const commands = build(createBuilder([])).commands;
    return {
        ...data,
        components: [
            ...data.components,
            {
                type: "path",
                d: commands.map((command) => command.d).join(" "),
            },
        ],
    };
};
//# sourceMappingURL=path.js.map