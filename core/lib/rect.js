export const rect = (data, x, y, width, height) => ({
    ...data,
    components: [
        ...data.components,
        {
            type: "rect",
            x,
            y,
            width,
            height,
        },
    ],
});
//# sourceMappingURL=rect.js.map