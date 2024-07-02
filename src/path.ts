import { type PictoData, type RenderingAttributes, addComponent, svgRenderingAttributes } from "./picto-data.js";
import { type Coord } from "./coord.js";

type PathCommand = Readonly<{ d: string }>;

export type PathBuilder = Readonly<
  {
    commands: readonly PathCommand[];
  } & {
    [K in "move" | "moveTo" | "line" | "lineTo"]: (point: Coord) => PathBuilder;
  } & {
    [K in "hLine" | "hLineTo" | "vLine" | "vLineTo"]: (arg: number) => PathBuilder;
  } & {
    [K in "curve" | "curveTo"]: (point1: Coord, point2: Coord, point3?: Coord) => PathBuilder;
  } & {
    [K in "arc" | "arcTo"]: (
      end: Coord,
      params: { radius: number | Coord; rotation?: number; largeArc?: boolean; counterclockwise?: boolean }
    ) => PathBuilder;
  } & {
    close: () => PathBuilder;
    repeat: (times: number, f: (builder: PathBuilder, n: number) => PathBuilder) => PathBuilder;
  }
>;

const moveLine = (command: string, { x, y }: Coord): PathCommand => ({
  d: `${command}${String(x)},${String(y)}`,
});

const hvLine = (command: string, arg: number): PathCommand => ({
  d: `${command}${String(arg)}`,
});

const curve = (
  command: readonly [string, string],
  ...[point1, point2, point3]: Parameters<PathBuilder["curve"]>
): PathCommand => ({
  d: `${point3 ? command[1] : command[0]}${[point1, point2, ...(point3 ? [point3] : [])]
    .flatMap(({ x, y }) => [x, y])
    .join(",")}`,
});

const arc = (
  command: string,
  ...[end, { radius, rotation, largeArc, counterclockwise }]: Parameters<PathBuilder["arc"]>
): PathCommand => {
  const { x: xRadius, y: yRadius } = typeof radius === "number" ? { x: radius, y: radius } : radius;
  return {
    d: `${command}${[xRadius, yRadius, rotation ?? 0, largeArc ? 1 : 0, counterclockwise ? 0 : 1, end.x, end.y].join(
      ","
    )}`,
  };
};

const createBuilder = (commands: readonly PathCommand[]): PathBuilder => {
  const add = (command: PathCommand) => createBuilder([...commands, command]);
  const builder: PathBuilder = {
    commands,
    move: (point) => add(moveLine("m", point)),
    moveTo: (point) => add(moveLine("M", point)),
    line: (point) => add(moveLine("l", point)),
    lineTo: (point) => add(moveLine("L", point)),
    hLine: (length) => add(hvLine("h", length)),
    hLineTo: (x) => add(hvLine("H", x)),
    vLine: (length) => add(hvLine("v", length)),
    vLineTo: (y) => add(hvLine("V", y)),
    curve: (...args) => add(curve(["q", "c"], ...args)),
    curveTo: (...args) => add(curve(["Q", "C"], ...args)),
    arc: (...args) => add(arc("a", ...args)),
    arcTo: (...args) => add(arc("A", ...args)),
    close: () => add({ d: "Z" }),
    repeat: (times, f) => [...Array(times).keys()].reduce((builder, n) => f(builder, n), builder),
  };
  return builder;
};

export const path = (
  data: PictoData,
  params: RenderingAttributes,
  build: (builder: PathBuilder) => PathBuilder
): PictoData => {
  const commands = build(createBuilder([])).commands;
  return addComponent(data, {
    svg: () => [["path", { d: commands.map((command) => command.d).join(" "), ...svgRenderingAttributes(params) }]],
  });
};
