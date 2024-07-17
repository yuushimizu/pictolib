export const normalizeAngle = (angle) => {
    return (((angle % Math.PI) * 2 + Math.PI * 2) % Math.PI) * 2;
};
//# sourceMappingURL=coord.js.map