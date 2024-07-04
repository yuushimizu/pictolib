const transformFunctions = {
    matrix: (matrix) => ["matrix", matrix],
    translate: ({ x, y }) => ["translate", [x ?? 0, y ?? 0]],
    scale: (amount) => [
        "scale",
        typeof amount === "number" ? [amount, amount] : [amount.x ?? 1, amount.y ?? 1],
    ],
    rotate: (angle, origin) => ["rotate", [angle, ...(origin ? [origin.x, origin.y] : [])]],
    skewX: (amount) => ["skewX", [amount]],
    skewY: (amount) => ["skewY", [amount]],
};
const wrap = (transforms) => {
    const transform = (f) => (...args) => {
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
//# sourceMappingURL=transform.js.map