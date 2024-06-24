import fs from "fs/promises";
import path from "path";
import { create } from "pictolib";

const picto = create({ viewBox: [0, 0, 20, 20], stroke: "black" }).path((p) => p.move(0, 0).line(15, 10));

const outputDir = path.join(new URL(".", import.meta.url).pathname, "..", "output");

void fs.writeFile(
  path.format({
    dir: outputDir,
    name: "battery",
    ext: "svg",
  }),
  picto.toSVG()
);
