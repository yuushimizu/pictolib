import { type PictoComponent, type PictoData } from "./picto-data.js";
type PathCommand = Readonly<{
    toSVG: () => string;
} & ({
    type: "move";
    x: number;
    y: number;
} | {
    type: "line";
    x: number;
    y: number;
})>;
export type PathComponent = PictoComponent;
export type PathBuilder = Readonly<{
    commands: readonly PathCommand[];
    move: (x: number, y: number) => PathBuilder;
    line: (x: number, y: number) => PathBuilder;
}>;
export declare function path(data: PictoData, build: (builder: PathBuilder) => PathBuilder): PictoData;
export {};
