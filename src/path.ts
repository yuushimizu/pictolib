import { type PictoData, addComponent } from "./picto-data.js";
import { type Coord } from "./coord.js";

type PathCommand = Readonly<{ d: string }>;

export type PathBuilder = Readonly<
  {
    commands: readonly PathCommand[];
  } & {
    [K in "move" | "moveTo" | "line" | "lineTo"]: (point: Coord) => PathBuilder;
  } & {
    close: () => PathBuilder;
    repeat: (times: number, f: (builder: PathBuilder, n: number) => PathBuilder) => PathBuilder;
  }
>;

const moveLine = (command: string, point: Coord): PathCommand => ({
  d: `${command}${String(point.x)},${String(point.y)}`,
});

const createBuilder = (commands: readonly PathCommand[]): PathBuilder => {
  const add = (command: PathCommand) => createBuilder([...commands, command]);
  const builder: PathBuilder = {
    commands,
    move: (point) => add(moveLine("m", point)),
    moveTo: (point) => add(moveLine("M", point)),
    line: (point) => add(moveLine("l", point)),
    lineTo: (point) => add(moveLine("L", point)),
    close: () => add({ d: "Z" }),
    repeat: (times, f) => [...Array(times).keys()].reduce((builder, n) => f(builder, n), builder),
  };
  return builder;
};

export const path = (data: PictoData, build: (builder: PathBuilder) => PathBuilder): PictoData => {
  const commands = build(createBuilder([])).commands;
  return addComponent(data, {
    svg: () => ["path", { d: commands.map((command) => command.d).join(" ") }],
  });
};
