export const isDate = (dateString: string) => {
    // Kiểm tra xem chuỗi đầu vào có đúng định dạng ngày tháng năm không (VD: "dd/mm/yyyy")
    const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (!regex.test(dateString)) {
        return false;
    }

    // Tách ngày, tháng và năm từ chuỗi
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Tháng trong JavaScript bắt đầu từ 0
    const year = parseInt(parts[2], 10);

    // Kiểm tra xem ngày, tháng và năm có hợp lệ không
    const date = new Date(year, month, day);
    return date.getDate() === day && date.getMonth() === month && date.getFullYear() === year;
};
