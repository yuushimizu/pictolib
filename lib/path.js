const move = (x, y) => ({
    type: "move",
    x,
    y,
    d: `m ${String(x)} ${String(y)}`,
});
const line = (x, y) => ({
    type: "line",
    x,
    y,
    d: `l ${String(x)} ${String(y)}`,
});
const createBuilder = (commands) => ({
    commands,
    move: (x, y) => createBuilder([...commands, move(x, y)]),
    line: (x, y) => createBuilder([...commands, line(x, y)]),
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