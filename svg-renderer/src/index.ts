import { create } from "xmlbuilder2";
import { type Picto, type PictoComponent, type PictoGroupOptions } from "pictolib";

type Builder = ReturnType<typeof create>;

const groupOptionsAttributes = (options: PictoGroupOptions): Record<string, string> => ({
  ...(options.stroke ? { stroke: options.stroke } : {}),
  ...(options.fill ? { fill: options.fill } : {}),
});

const buildChildren = (builder: Builder, parent: Readonly<{ components: readonly PictoComponent[] }>): Builder =>
  parent.components.reduce((builder, component) => build(builder, component), builder);

const build = (builder: Builder, component: PictoComponent): Builder => {
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
      return buildChildren(builder.ele("g", groupOptionsAttributes(component.options)), component).up();
  }
};

export const renderAsSVG = (picto: Picto): string =>
  buildChildren(
    create().ele("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      ...(picto.options.viewBox ? { viewBox: picto.options.viewBox.join(" ") } : {}),
      ...groupOptionsAttributes(picto.options),
    }),
    picto
  )
    .up()
    .end();
