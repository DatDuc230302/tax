export const formatTime = (time: string) => {
    const dateObject = new Date(time);

    // Định dạng ngày tháng theo ý muốn (ví dụ: "DD/MM/YYYY HH:mm:ss")
    const formatTime = `${dateObject.getDate()}/${
        dateObject.getMonth() + 1
    }/${dateObject.getFullYear()} ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;

    return formatTime;
};
