import { create } from "xmlbuilder2";
import { normalizeAngle } from "pictolib";
const groupOptionsAttributes = (options) => {
    const attribute = (key, value, f = String) => value != undefined ? { [key]: f(value) } : {};
    return {
        ...attribute("stroke", options.stroke),
        ...attribute("fill", options.fill),
        ...attribute("stroke-width", options.strokeWidth),
        ...attribute("stroke-linecap", options.lineCap),
        ...attribute("stroke-linejoin", options.lineJoin),
    };
};
const buildChildren = (builder, parent) => parent.components.reduce((builder, component) => build(builder, component), builder);
const build = (builder, component) => {
    switch (component.type) {
        case "path":
            return builder.ele("path", { d: component.d }).up();
        case "rect":
            return builder
                .ele("rect", {
                x: component.x,
                y: component.y,
                width: component.width,
                height: component.height,
                ...(component.round ? { rx: component.round.x, ry: component.round.y } : {}),
            })
                .up();
        case "circle":
            return builder.ele("circle", { cx: component.center.x, cy: component.center.y, r: component.radius }).up();
        case "arc":
            {
                const largeArc = normalizeAngle(component.counterclockwise ? component.start - component.end : component.end - component.start) > Math.PI;
                return builder
                    .ele("path", {
                    fill: "transparent",
                    d: `M ${String(component.center.x + component.radius * Math.cos(component.start))},${String(component.center.y + component.radius * Math.sin(component.start))} A ${String(component.radius)},${String(component.radius)},0,${String(largeArc ? 1 : 0)},${String(component.counterclockwise ? 0 : 1)},${String(component.center.x + component.radius * Math.cos(component.end))},${String(component.center.y + component.radius * Math.sin(component.end))}`,
                })
                    .up();
            }
            break;
        case "group":
            return buildChildren(builder.ele("g", groupOptionsAttributes(component.options)), component).up();
    }
};
export const renderAsSVG = (picto) => {
    const viewBox = picto.options.viewBox;
    return buildChildren(create().ele("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        ...(viewBox ? { viewBox: [viewBox.x, viewBox.y, viewBox.width, viewBox.height].join(" ") } : {}),
        ...groupOptionsAttributes(picto.options),
    }), picto)
        .up()
        .end();
};
//# sourceMappingURL=index.js.map