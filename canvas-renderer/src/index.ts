import { type Picto, type PictoComponent, type PictoOptions, type PictoGroupOptions } from "pictolib";

const setGroupOptions = (context: CanvasRenderingContext2D, options: PictoGroupOptions) => {
  if (options.stroke) {
    context.strokeStyle = options.stroke;
  }
  if (options.fill) {
    context.fillStyle = options.fill;
  }
};

const drawGroup = (
  context: CanvasRenderingContext2D,
  parent: Readonly<{ options: PictoGroupOptions; components: readonly PictoComponent[] }>
) => {
  context.save();
  try {
    setGroupOptions(context, parent.options);
    for (const component of parent.components) {
      draw(context, component);
    }
  } finally {
    context.restore();
  }
};

const draw = (context: CanvasRenderingContext2D, component: PictoComponent) => {
  switch (component.type) {
    case "path":
      {
        const path = new Path2D(component.d);
        context.fill(path);
        context.stroke(path);
      }
      break;
    case "rect":
      context.fillRect(component.x, component.y, component.width, component.height);
      context.strokeRect(component.x, component.y, component.width, component.height);
      break;
    case "group":
      drawGroup(context, component);
      break;
  }
};

type Options = Readonly<{
  x?: number | undefined;
  y?: number | undefined;
  width?: number | undefined;
  height?: number | undefined;
}>;

const setViewBox = (context: CanvasRenderingContext2D, viewBox: PictoOptions["viewBox"], options: Options) => {
  if (options.x != undefined || options.y != undefined) {
    context.translate(options.x ?? 0, options.y ?? 0);
  }
  if (viewBox) {
    if (options.width != undefined && options.height != undefined) {
      const scale = {
        x: options.width / viewBox[2],
        y: options.height / viewBox[3],
      };
      context.scale(scale.x, scale.y);
    }
    context.translate(-viewBox[0], -viewBox[1]);
  }
};

export const drawToCanvas = (
  context: CanvasRenderingContext2D,
  picto: Picto,
  options: Options | undefined = undefined
) => {
  context.save();
  try {
    setViewBox(context, picto.options.viewBox, options ?? {});
    drawGroup(context, picto);
  } finally {
    context.restore();
  }
};
