import { battery } from "pictolib-examples";
import { drawToCanvas } from "pictolib-canvas-renderer";
import "./style.css";

const main = document.querySelector("main");

const size = {
  width: 600,
  height: 600,
};

for (let level = 0; level <= 3; ++level) {
  const canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;
  drawToCanvas(canvas.getContext("2d")!!, battery(level), size);
  main?.append(canvas);
}
