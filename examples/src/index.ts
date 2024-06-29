import { create } from "pictolib";

export const battery = create({ viewBox: [100, 200, 300, 400], stroke: "navy" })
  .group({ stroke: "gray" }, (g) => g.rect(100, 200, 300, 400))
  .group({ fill: "navy" }, (g) => g.rect(150, 210, 200, 40))
  .rect(110, 250, 280, 340);
