import { create as createTransform } from "./transform.js";
export const emptyData = { components: [] };
export const addComponent = (data, component) => ({
    ...data,
    components: [...data.components, component],
});
const svgAttribute = (key, value, f = String) => value != undefined ? { [key]: f(value) } : {};
export const svgPresentationAttributes = (attributes) => ({
    ...svgAttribute("fill", attributes.fill),
    ...svgAttribute("fill-opacity", attributes.fillOpacity),
    ...svgAttribute("stroke", attributes.stroke),
    ...svgAttribute("stroke-opacity", attributes.strokeOpacity),
    ...svgAttribute("stroke-width", attributes.strokeWidth),
    ...svgAttribute("stroke-linecap", attributes.lineCap),
    ...svgAttribute("stroke-linejoin", attributes.lineJoin),
    ...svgAttribute("stroke-miterlimit", attributes.miterlimit),
    ...svgAttribute("stroke-dasharray", attributes.dasharray, (value) => (typeof value === "number" ? [value] : value).join(" ")),
    ...svgAttribute("stroke-dashoffset", attributes.dashoffset),
    ...svgAttribute("transform", attributes.transform, (transform) => transform(createTransform()).svg()),
    ...svgAttribute("transform-origin", attributes.transformOrigin, (value) => typeof value === "string" || typeof value === "number" ? value : [value.x, value.y].join(" ")),
    ...svgAttribute("style", attributes.style),
});
export const svgShapeStrokePresentationAttributes = (attributes) => ({
    ...svgPresentationAttributes(attributes),
    ...svgAttribute("pathLength", attributes.pathLength),
});
//# sourceMappingURL=picto-data.js.map