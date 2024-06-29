import fs from "fs/promises";
import path from "path";
import { create } from "pictolib";
import { renderAsSVG } from "pictolib-svg-renderer";

const picto = create({ viewBox: [0, 0, 20, 20], stroke: "black" })
  .path((p) => p.move(0, 0).line(15, 10))
  .rect(3, 5, 8, 4)
  .group({ stroke: "green" }, (group) => group.rect(4, 7, 3, 4).path((p) => p.move(20, 20).line(-10, -10)));
const outputDir = path.join(new URL(".", import.meta.url).pathname, "..", "output");

void fs.writeFile(
  path.format({
    dir: outputDir,
    name: "battery",
    ext: "svg",
  }),
  renderAsSVG(picto)
);
