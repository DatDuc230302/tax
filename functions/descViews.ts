export const descViews = (arr: object[]) => {
    const sortedObject = arr.sort((a: any, b: any) => b.view - a.view);

    return sortedObject;
};
