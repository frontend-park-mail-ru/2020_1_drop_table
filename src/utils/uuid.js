export const uuid = () =>
    `_${Math.random()
        .toFixed(19)
        .substr(2, 9)}`;
