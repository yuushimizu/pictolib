import fs from "fs/promises";
import path from "path";
import { type Picto, type PictoFragment, create } from "pictolib";

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
      viewBox: { origin: { x: -1, y: -1 }, size: { width: 2, height: 2 } },
      stroke: lineColor,
      fill: "transparent",
      strokeWidth: 0.1,
    })
      .rect({ origin: { x: -0.24, y: -0.85 }, size: { width: 0.48, height: 0.1 }, fill: lineColor })
      .rect({ origin: { x: -0.6, y: -0.7 }, size: { width: 1.2, height: 1.55 }, round: 0.1 })
      .group({ stroke: "transparent", fill: ["", "#e66", "#ea4", "#8d2"][level] }, (g) =>
        g.repeat(level, (f, n) =>
          f.rect({ origin: { x: -0.45, y: 0.35 - n * 0.45 }, size: { width: 0.9, height: 0.35 } })
        )
      )
  );
}

{
  const angle = 0.75;
  const height = 0.6;
  save(
    "wifi",
    create({
      viewBox: { origin: { x: -0.5, y: -0.5 }, size: { width: 1, height: 1 } },
      stroke: "#333",
      fill: "transparent",
      strokeWidth: 0.075,
      lineCap: "round",
    })
      .repeat(3, (f, n) =>
        f.arc({
          center: { x: 0, y: height / 2 },
          radius: height - (height / 3) * n,
          start: -angle,
          end: Math.PI + angle,
          counterclockwise: true,
        })
      )
      .circle({ center: { x: 0, y: height / 2 }, radius: 0.04, fill: "#333" })
  );
}

const star = (f: PictoFragment) => {
  const spikes = 5;
  const angle = (Math.PI * 2) / (spikes * 2);
  const point = (angle: number, length: number) => ({
    x: length * Math.cos(angle - Math.PI / 2),
    y: length * Math.sin(angle - Math.PI / 2),
  });
  return f.path({}, (p) =>
    p
      .move(point(0, 90))
      .repeat(spikes, (p, n) => p.lineTo(point(angle * (n * 2 + 1), 50)).lineTo(point(angle * ((n + 1) * 2), 90)))
      .close()
  );
};

{
  save(
    "star",
    create({
      viewBox: { origin: { x: -100, y: -100 }, size: { width: 200, height: 200 } },
      stroke: "black",
      fill: "yellow",
      strokeWidth: 5,
      lineJoin: "round",
    }).fragment(star)
  );
}

save(
  "star-shadow",
  create({
    viewBox: { origin: { x: -100, y: -100 }, size: { width: 200, height: 200 } },
    stroke: "transparent",
    fill: "rgba(64, 64, 64, 0.5)",
    transform: (t) => t.rotate(-10).skewX(40).scale({ x: 1, y: 0.5 }),
  }).fragment(star)
);

{
  const pileus = (f: PictoFragment) =>
    f.arc({ center: { x: 0, y: 0 }, radius: 9, start: -Math.PI, end: 0, counterclockwise: false });
  save(
    "mushroom",
    create({ viewBox: { origin: { x: -10, y: -10 }, size: { width: 20, height: 20 } }, stroke: "transparent" })
      .group({ fill: "red" }, pileus)
      .rect({ origin: { x: -3, y: 0 }, size: { width: 6, height: 9 }, fill: "orange" })
      .mask(
        (m) => m.group({ stroke: "white", fill: "white", strokeWidth: 0.006 }, pileus),
        (g) =>
          g.group({ fill: "#ffc" }, (g) => {
            const radius = 2;
            return g
              .circle({ center: { x: 0, y: -3 }, radius })
              .circle({ center: { x: -7, y: -3 }, radius })
              .circle({ center: { x: 7, y: -3 }, radius })
              .circle({ center: { x: -3, y: -8 }, radius })
              .circle({ center: { x: 3, y: -8 }, radius });
          })
      )
  );
}
