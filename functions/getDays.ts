export const getDays = (date: string) => {
    const createdAtDate: any = new Date(date);
    const currentDate: any = new Date();
    const timeDifferenceInMilliseconds = currentDate - createdAtDate;
    const numberOfDays = Math.floor(timeDifferenceInMilliseconds / (24 * 60 * 60 * 1000));

    return numberOfDays;
};
