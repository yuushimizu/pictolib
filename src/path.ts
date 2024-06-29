import { type PictoData, type PictoComponentConstraint } from "./picto-data.js";

type PathCommand = Readonly<
  { d: string } & (
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

export type PathComponent = Readonly<{
  type: "path";
  d: string;
}>;

export type PathBuilder = Readonly<{
  commands: readonly PathCommand[];
  move: (x: number, y: number) => PathBuilder;
  line: (x: number, y: number) => PathBuilder;
}>;

const move = (x: number, y: number): PathCommand => ({
  type: "move",
  x,
  y,
  d: `m ${String(x)} ${String(y)}`,
});

const line = (x: number, y: number): PathCommand => ({
  type: "line",
  x,
  y,
  d: `l ${String(x)} ${String(y)}`,
});

const createBuilder = (commands: readonly PathCommand[]): PathBuilder => ({
  commands,
  move: (x, y) => createBuilder([...commands, move(x, y)]),
  line: (x, y) => createBuilder([...commands, line(x, y)]),
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
