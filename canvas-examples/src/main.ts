import { type Picto } from "pictolib";
import { battery, wifi, star } from "pictolib-examples";
import { drawToCanvas } from "pictolib-canvas-renderer";
import "./style.css";

const main = document.querySelector("main");

const size = {
  width: 600,
  height: 600,
};

const add = (picto: Picto) => {
  const canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;
  drawToCanvas(canvas.getContext("2d")!!, picto, size);
  main?.append(canvas);
};

for (let level = 0; level <= 3; ++level) {
  add(battery(level));
}

add(wifi());

add(star());
