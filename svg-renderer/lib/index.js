import { create } from "xmlbuilder2";
const groupOptionsAttributes = (options) => ({
    ...(options.stroke ? { stroke: options.stroke } : {}),
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
            })
                .up();
        case "group":
            return buildChildren(builder.ele("g", groupOptionsAttributes(component.options)), component);
    }
};
export const renderAsSVG = (picto) => buildChildren(create().ele("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    ...(picto.options.viewBox ? { viewBox: picto.options.viewBox.join(" ") } : {}),
    ...groupOptionsAttributes(picto.options),
}), picto)
    .up()
    .end();
//# sourceMappingURL=index.js.map