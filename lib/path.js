function move(x, y) {
    return {
        type: "move",
        x,
        y,
        toSVG: () => `m ${x} ${y}`,
    };
}
function line(x, y) {
    return {
        type: "line",
        x,
        y,
        toSVG: () => `l ${x} ${y}`,
    };
}
function createBuilder(commands) {
    return {
        commands,
        move: (x, y) => createBuilder([...commands, move(x, y)]),
        line: (x, y) => createBuilder([...commands, line(x, y)]),
    };
}
export function path(data, build) {
    const commands = build(createBuilder([])).commands;
    return {
        components: [
            ...data.components,
            {
                toSVG: () => `<path d="${commands.map((command) => command.toSVG()).join(" ")}"/>`,
            },
        ],
    };
}
//# sourceMappingURL=path.js.map