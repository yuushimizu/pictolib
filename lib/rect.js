export const rect = (data, x, y, width, height) => ({
    ...data,
    components: [
        ...data.components,
        {
            toSVG: () => `<rect x="${x}" y="${y}" width="${width}" height="${height}"></rect>`,
        },
    ],
});
//# sourceMappingURL=rect.js.map