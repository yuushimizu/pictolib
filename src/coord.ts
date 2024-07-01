export type Coord = Readonly<{
  x: number;
  y: number;
}>;

export type Size = Readonly<{
  width: number;
  height: number;
}>;

export type Rect = Readonly<{
  origin: Coord;
  size: Size;
}>;

export const normalizeAngle = (angle: number): number => {
  let result = angle;
  while (result < 0) {
    result += Math.PI * 2;
  }
  while (result >= Math.PI * 2) {
    result -= Math.PI * 2;
  }
  return result;
};
