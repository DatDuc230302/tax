export const descViews = (arr: object[]) => {
    const sortedObject = arr.sort((a: any, b: any) => b.views - a.views);

    return sortedObject;
};
