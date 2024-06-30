const setGroupOptions = (context, options) => {
    const set = (value, f) => {
        if (value != undefined) {
            f(value);
        }
    };
    set(options.stroke, (value) => (context.strokeStyle = value));
    set(options.fill, (value) => (context.fillStyle = value));
    set(options.strokeWidth, (value) => (context.lineWidth = value));
    set(options.lineCap, (value) => (context.lineCap = value));
    set(options.lineJoin, (value) => (context.lineJoin = value));
};
const drawGroup = (context, parent) => {
    context.save();
    try {
        setGroupOptions(context, parent.options);
        for (const component of parent.components) {
            draw(context, component);
        }
    }
    finally {
        context.restore();
    }
};
const draw = (context, component) => {
    switch (component.type) {
        case "path":
            {
                const path = new Path2D(component.d);
                context.fill(path);
                context.stroke(path);
            }
            break;
        case "rect":
            context.beginPath();
            context.roundRect(component.x, component.y, component.width, component.height, component.round);
            context.fill();
            context.stroke();
            break;
        case "circle":
            context.beginPath();
            context.arc(component.center.x, component.center.y, component.radius, 0, Math.PI * 2);
            context.closePath();
            context.fill();
            context.stroke();
            break;
        case "arc":
            context.beginPath();
            context.arc(component.center.x, component.center.y, component.radius, component.start, component.end, component.counterclockwise);
            context.stroke();
            break;
        case "group":
            drawGroup(context, component);
            break;
    }
};
const setViewBox = (context, viewBox, options) => {
    if (options.x != undefined || options.y != undefined) {
        context.translate(options.x ?? 0, options.y ?? 0);
    }
    if (viewBox) {
        if (options.width != undefined && options.height != undefined) {
            const scale = {
                x: options.width / viewBox.width,
                y: options.height / viewBox.height,
            };
            context.scale(scale.x, scale.y);
        }
        context.translate(-viewBox.x, -viewBox.y);
    }
};
export const drawToCanvas = (context, picto, options = undefined) => {
    context.save();
    try {
        setViewBox(context, picto.options.viewBox, options ?? {});
        drawGroup(context, picto);
    }
    finally {
        context.restore();
    }
};
//# sourceMappingURL=index.js.map