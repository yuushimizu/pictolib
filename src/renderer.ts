import { type Picto, type PictoComponent } from "./index.js";

const toSVG = (component: PictoComponent): string => {
  switch (component.type) {
    case "path":
      return `<path d="${component.d}"></path>`;
    case "rect":
      return `<rect x="${String(component.x)}" y="${String(component.y)}" width="${String(
        component.width
      )}" height="${String(component.height)}"></rect>`;
    case "group":
      return `<g ${[...(component.options.stroke ? [["stroke", component.options.stroke]] : [])]
        .map(([name, value]) => `${name}="${value}"`)
        .join(" ")}>${component.components.map((component) => toSVG(component)).join("")}</g>`;
  }
};

export const renderAsSVG = (picto: Picto): string =>
  `<svg ${[
    ["xmlns", "http://www.w3.org/2000/svg"],
    ...(picto.options.viewBox ? [["viewBox", picto.options.viewBox.join(" ")]] : []),
    ...(picto.options.stroke ? [["stroke", picto.options.stroke]] : []),
  ]
    .map(([name, value]) => `${name}="${value}"`)
    .join(" ")}>${picto.components.map(toSVG).join("")}</svg>`;
