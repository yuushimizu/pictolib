import { create } from "pictolib";
import { PictoGroup } from "../../core/lib/group";

export const battery = create({
  viewBox: [100, 200, 300, 400],
  stroke: "#444",
  fill: "transparent",
  strokeWidth: 10,
})
  .group({ fill: "#444" }, (g) => g.rect(170, 210, 160, 40))
  .rect(110, 250, 280, 340)
  .group(
    { stroke: "transparent", fill: "#8d2" },
    (g): PictoGroup => [...Array(3).keys()].reduce((g, i) => g.rect(125, 265 + i * 107.5, 250, 95), g)
  );
