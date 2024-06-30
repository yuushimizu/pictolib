import { type PictoData, type PictoComponentConstraint } from "./picto-data.js";
import { type Coord } from "./coord.js";

type MoveLine = Readonly<{ type: "moveBy" | "moveTo" | "lineBy" | "lineTo" }> & Coord;

type PathCommand = Readonly<{ d: string } & MoveLine>;

export type PathComponent = Readonly<{
  type: "path";
  d: string;
}>;

export type PathBuilder = Readonly<
  {
    commands: readonly PathCommand[];
  } & {
    [K in "move" | "moveTo" | "line" | "lineTo"]: (point: Coord) => PathBuilder;
  }
>;

const moveLine = (type: MoveLine["type"], command: string, point: Coord): PathCommand => ({
  ...point,
  type,
  d: `${command}${String(point.x)},${String(point.y)}`,
});

const createBuilder = (commands: readonly PathCommand[]): PathBuilder => ({
  commands,
  move: (point) => createBuilder([...commands, moveLine("moveBy", "m", point)]),
  moveTo: (point) => createBuilder([...commands, moveLine("moveTo", "M", point)]),
  line: (point) => createBuilder([...commands, moveLine("lineBy", "l", point)]),
  lineTo: (point) => createBuilder([...commands, moveLine("lineTo", "L", point)]),
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
