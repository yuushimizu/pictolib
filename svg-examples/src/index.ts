import fs from "fs/promises";
import path from "path";
import { type Picto } from "pictolib";
import { renderAsSVG } from "pictolib-svg-renderer";
import { battery } from "pictolib-examples";

const outputDir = path.join(new URL(".", import.meta.url).pathname, "..", "output");

const save = (picto: Picto, name: string) => {
  void fs.writeFile(
    path.format({
      dir: outputDir,
      name,
      ext: "svg",
    }),
    renderAsSVG(picto)
  );
};

for (let level = 0; level <= 3; ++level) {
  save(battery(level), `battery${level}`);
}
