import { type PictoComponent, type PictoData } from "./picto-data.js";

type PathCommand = Readonly<
  { toSVG: () => string } & (
    | {
        type: "move";
        x: number;
        y: number;
      }
    | {
        type: "line";
        x: number;
        y: number;
      }
  )
>;

export type PathComponent = PictoComponent;

export type PathBuilder = Readonly<{
  commands: readonly PathCommand[];
  move: (x: number, y: number) => PathBuilder;
  line: (x: number, y: number) => PathBuilder;
}>;

function move(x: number, y: number): PathCommand {
  return {
    type: "move",
    x,
    y,
    toSVG: () => `m ${x} ${y}`,
  };
}

function line(x: number, y: number): PathCommand {
  return {
    type: "line",
    x,
    y,
    toSVG: () => `l ${x} ${y}`,
  };
}

function createBuilder(commands: readonly PathCommand[]): PathBuilder {
  return {
    commands,
    move: (x, y) => createBuilder([...commands, move(x, y)]),
    line: (x, y) => createBuilder([...commands, line(x, y)]),
  };
}

export function path(data: PictoData, build: (builder: PathBuilder) => PathBuilder): PictoData {
  const commands = build(createBuilder([])).commands;
  return {
    ...data,
    components: [
      ...data.components,
      {
        toSVG: () => `<path d="${commands.map((command) => command.toSVG()).join(" ")}"/>`,
      },
    ],
  };
}
