export const getTime = () => {
    const currentDate = new Date();

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
};
