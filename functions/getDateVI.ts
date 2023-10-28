export const getDateVI = () => {
    // Tạo một đối tượng Date từ chuỗi ngày tháng
    const date = new Date();

    // Mảng tên các tháng
    const monthsVI = [
        'tháng 1',
        'tháng 2',
        'tháng 3',
        'tháng 4',
        'tháng 5',
        'tháng 6',
        'tháng 7',
        'tháng 8',
        'tháng 9',
        'tháng 10',
        'tháng 11',
        'tháng 12',
    ];

    // Mảng tên các ngày trong tuần
    const daysVI = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    // Lấy thông tin ngày, tháng, năm, và tên của ngày trong tuần
    const day = date.getDate();
    const month = monthsVI[date.getMonth()];
    const year = date.getFullYear();
    const dateVI = daysVI[date.getDay()];

    // Tạo chuỗi định dạng mới
    const ketQua = dateVI + ', ngày ' + day + ' ' + month + ' năm ' + year;

    return ketQua;
};
