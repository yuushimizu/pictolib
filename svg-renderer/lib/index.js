import { create } from "xmlbuilder2";
const groupOptionsAttributes = (options) => ({
    ...(options.stroke != undefined ? { stroke: options.stroke } : {}),
    ...(options.fill != undefined ? { fill: options.fill } : {}),
    ...(options.strokeWidth != undefined ? { "stroke-width": String(options.strokeWidth) } : {}),
});
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