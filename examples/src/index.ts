import fs from "fs/promises";
import path from "path";
import { type Picto, create } from "pictolib";

const outputDir = path.join(new URL(".", import.meta.url).pathname, "..", "output");

const save = (name: string, picto: Picto) => {
  void fs.writeFile(
    path.format({
      dir: outputDir,
      name,
      ext: "svg",
    }),
    picto.svg()
  );
};

for (let level = 0; level <= 3; ++level) {
  const lineColor = level === 0 ? "#aaa" : "#222";
  save(
    `battery${String(level)}`,
    create({
      viewBox: { x: -1, y: -1, width: 2, height: 2 },
      stroke: lineColor,
      fill: "transparent",
      strokeWidth: 0.1,
    })
      .group({ fill: lineColor }, (g) => g.rect({ x: -0.24, y: -0.85, width: 0.48, height: 0.1 }))
      .rect({ x: -0.6, y: -0.7, width: 1.2, height: 1.55, round: 0.1 })
      .group({ stroke: "transparent", fill: ["", "#e66", "#ea4", "#8d2"][level] }, (g) =>
        g.repeat(level, (g, n) => g.rect({ x: -0.45, y: 0.35 - n * 0.45, width: 0.9, height: 0.35 }))
      )
  );
}

{
  const angle = 0.75;
  const height = 0.6;
  save(
    "wifi",
    create({
      viewBox: { x: -0.5, y: -0.5, width: 1, height: 1 },
      stroke: "black",
      fill: "transparent",
      strokeWidth: 0.075,
      lineCap: "round",
    })
      .repeat(3, (g, n) =>
        g.arc({
          center: { x: 0, y: height / 2 },
          radius: height - (height / 3) * n,
          start: -angle,
          end: Math.PI + angle,
          counterclockwise: true,
        })
      )
      .group({ fill: "black" }, (g) => g.circle({ center: { x: 0, y: height / 2 }, radius: 0.04 }))
  );
}

{
  const spikes = 5;
  const angle = (Math.PI * 2) / (spikes * 2);
  const point = (angle: number, length: number) => ({
    x: length * Math.cos(angle - Math.PI / 2),
    y: length * Math.sin(angle - Math.PI / 2),
  });
  save(
    "star",
    create({
      viewBox: { x: -100, y: -100, width: 200, height: 200 },
      stroke: "black",
      fill: "yellow",
      strokeWidth: 5,
      lineJoin: "round",
    }).path((p) =>
      p
        .move(point(0, 90))
        .repeat(spikes, (p, n) => p.lineTo(point(angle * (n * 2 + 1), 50)).lineTo(point(angle * ((n + 1) * 2), 90)))
        .close()
    )
  );
}
