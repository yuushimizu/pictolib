const move = (x, y) => ({
    type: "move",
    x,
    y,
    toSVG: () => `m ${x} ${y}`,
});
const line = (x, y) => ({
    type: "line",
    x,
    y,
    toSVG: () => `l ${x} ${y}`,
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
                toSVG: () => `<path d="${commands.map((command) => command.toSVG()).join(" ")}"/>`,
            },
        ],
    };
};
//# sourceMappingURL=path.js.map