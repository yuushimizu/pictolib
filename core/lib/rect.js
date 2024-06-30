export const rect = (data, { round, ...params }) => ({
    ...data,
    components: [
        ...data.components,
        {
            ...params,
            type: "rect",
            round: typeof round === "number" ? { x: round, y: round } : round,
        },
    ],
});
//# sourceMappingURL=rect.js.map