import { type PictoData, type PictoComponentConstraint } from "./picto-data.js";
type PathCommand = Readonly<{
    d: string;
} & ({
    type: "move";
    x: number;
    y: number;
} | {
    type: "line";
    x: number;
    y: number;
})>;
export type PathComponent = Readonly<{
    type: "path";
    d: string;
}>;
export type PathBuilder = Readonly<{
    commands: readonly PathCommand[];
    move: (x: number, y: number) => PathBuilder;
    line: (x: number, y: number) => PathBuilder;
}>;
export declare const path: <C extends PictoComponentConstraint>(data: PictoData<C>, build: (builder: PathBuilder) => PathBuilder) => PictoData<C | PathComponent>;
export {};
