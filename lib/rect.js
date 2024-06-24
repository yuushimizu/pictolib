export function rect(data, x, y, width, height) {
    return {
        ...data,
        components: [
            ...data.components,
            {
                toSVG: () => `<rect x="${x}" y="${y}" width="${width}" height="${height}">`,
            },
        ],
    };
}
//# sourceMappingURL=rect.js.map