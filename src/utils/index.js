export const toasting = () => {};

export const thousandNum = (n) => {
    const num = Number(n);
    if (isNaN(num)) return 0;
    return num.toLocaleString("zh-TW", {
        Style: "currency",
        currency: "TWD",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });
};

export const sleeping = (ms) => {
    return new Promise((res) => {
        setTimeout(() => {
            res('sleeping for ' + ms);
        }, ms);
    });
};
