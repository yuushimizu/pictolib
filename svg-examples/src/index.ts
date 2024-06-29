import fs from "fs/promises";
import path from "path";
import { renderAsSVG } from "pictolib-svg-renderer";
import { battery } from "pictolib-examples";

const outputDir = path.join(new URL(".", import.meta.url).pathname, "..", "output");

void fs.writeFile(
  path.format({
    dir: outputDir,
    name: "battery",
    ext: "svg",
  }),
  renderAsSVG(battery)
);
