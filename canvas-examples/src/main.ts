import { battery } from "pictolib-examples";
import { drawToCanvas } from "pictolib-canvas-renderer";
import "./style.css";

drawToCanvas((document.querySelector("#battery") as HTMLCanvasElement).getContext("2d")!!, battery, {
  width: 600,
  height: 800,
});
