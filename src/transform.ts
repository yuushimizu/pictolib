import { type Coord } from "./coord";

export type Transform = Readonly<{
  svgAttribute: string;
}>;

type CallComponent = readonly [string, readonly number[]];

const transformFunctions = {
  matrix: (matrix: readonly [number, number, number, number, number, number]) => ["matrix", matrix],
  translate: ({ x, y }: Partial<Coord>) => ["translate", [x ?? 0, y ?? 0]],
  scale: (amount: number | Partial<Coord>) => [
    "scale",
    typeof amount === "number" ? [amount, amount] : [amount.x ?? 1, amount.y ?? 1],
  ],
  rotate: (angle: number, origin?: Coord) => ["rotate", [angle, ...(origin ? [origin.x, origin.y] : [])]],
  skewX: (amount: number) => ["skewX", [amount]],
  skewY: (amount: number) => ["skewY", [amount]],
} as const satisfies Record<string, (...args: never) => CallComponent>;

type TransformFunctions = typeof transformFunctions;

export type TransformBuilder = Readonly<
  {
    [Key in keyof TransformFunctions]: (...args: Parameters<TransformFunctions[Key]>) => TransformBuilder;
  } & {
    svg: () => string;
  }
>;

const wrap = (transforms: readonly Transform[]): TransformBuilder => {
  const transform =
    <F extends (...args: A) => CallComponent, A extends readonly unknown[] = Parameters<F>>(f: F) =>
    (...args: A) => {
      const [name, params] = f(...args);
      return wrap([
        ...transforms,
        {
          svgAttribute: `${name}(${params.join(" ")})`,
        },
      ]);
    };
  return {
    matrix: transform(transformFunctions.matrix),
    translate: transform(transformFunctions.translate),
    scale: transform(transformFunctions.scale),
    rotate: transform(transformFunctions.rotate),
    skewX: transform(transformFunctions.skewX),
    skewY: transform(transformFunctions.skewY),
    svg: () => transforms.map((transform) => transform.svgAttribute).join(" "),
  };
};

export const create = () => wrap([]);
