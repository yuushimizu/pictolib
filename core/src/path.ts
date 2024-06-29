import { type PictoData, type PictoComponentConstraint } from "./picto-data.js";

type Point = Readonly<{
  x: number;
  y: number;
}>;

type MoveLine = Readonly<{ type: "moveBy" | "moveTo" | "lineBy" | "lineTo" }> & Point;

type PathCommand = Readonly<{ d: string } & MoveLine>;

export type PathComponent = Readonly<{
  type: "path";
  d: string;
}>;

export type PathBuilder = Readonly<
  {
    commands: readonly PathCommand[];
  } & {
    [K in "move" | "moveTo" | "line" | "lineTo"]: (x: number, y: number) => PathBuilder;
  }
>;

const moveLine = (type: MoveLine["type"], command: string, x: number, y: number): PathCommand => ({
  type,
  x,
  y,
  d: `${command}${String(x)},${String(y)}`,
});

const createBuilder = (commands: readonly PathCommand[]): PathBuilder => ({
  commands,
  move: (x, y) => createBuilder([...commands, moveLine("moveBy", "m", x, y)]),
  moveTo: (x, y) => createBuilder([...commands, moveLine("moveTo", "M", x, y)]),
  line: (x, y) => createBuilder([...commands, moveLine("lineBy", "l", x, y)]),
  lineTo: (x, y) => createBuilder([...commands, moveLine("lineTo", "L", x, y)]),
});

export const path = <C extends PictoComponentConstraint>(
  data: PictoData<C>,
  build: (builder: PathBuilder) => PathBuilder
): PictoData<C | PathComponent> => {
  const commands = build(createBuilder([])).commands;
  return {
    ...data,
    components: [
      ...data.components,
      {
        type: "path",
        d: commands.map((command) => command.d).join(" "),
      },
    ],
  };
};
