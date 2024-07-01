export const normalizeAngle = (angle) => {
    let result = angle;
    while (result < 0) {
        result += Math.PI * 2;
    }
    while (result >= Math.PI * 2) {
        result -= Math.PI * 2;
    }
    return result;
};
//# sourceMappingURL=coord.js.map