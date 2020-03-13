export const uuid = () =>
    `_${Math.random()
        .toFixed(36)
        .substr(2, 9)}`;
