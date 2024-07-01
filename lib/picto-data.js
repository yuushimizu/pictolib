export const emptyData = { components: [] };
export const addComponent = (data, component) => ({
    ...data,
    components: [...data.components, component],
});
export const svgRenderingAttributes = (options) => {
    const attribute = (key, value, f = String) => value != undefined ? { [key]: f(value) } : {};
    return {
        ...attribute("stroke", options.stroke),
        ...attribute("fill", options.fill),
        ...attribute("stroke-width", options.strokeWidth),
        ...attribute("stroke-linecap", options.lineCap),
        ...attribute("stroke-linejoin", options.lineJoin),
    };
};
//# sourceMappingURL=picto-data.js.map