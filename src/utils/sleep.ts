export const sleep = async (ms: number) => {
    await new Promise((resolve) => {
        return setTimeout(() => {
            resolve(null);
        }, ms);
    });
};
