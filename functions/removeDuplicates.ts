export const removeDuplicates = (arr: any, prop: any) => {
    return arr.filter(
        (obj: any, index: any, self: any) => index === self.findIndex((el: any) => el[prop] === obj[prop]),
    );
};
