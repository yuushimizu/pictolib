import { create as createTransform } from "./transform.js";
export const emptyData = { components: [] };
export const addComponent = (data, component) => ({
    ...data,
    components: [...data.components, component],
});
export const svgRenderingAttributes = (attributes) => {
    const attribute = (key, value, f = String) => value != undefined ? { [key]: f(value) } : {};
    return {
        ...attribute("stroke", attributes.stroke),
        ...attribute("fill", attributes.fill),
        ...attribute("stroke-width", attributes.strokeWidth),
        ...attribute("stroke-linecap", attributes.lineCap),
        ...attribute("stroke-linejoin", attributes.lineJoin),
        ...attribute("transform", attributes.transform, (transform) => transform(createTransform()).svg()),
    };
};
//# sourceMappingURL=picto-data.js.map