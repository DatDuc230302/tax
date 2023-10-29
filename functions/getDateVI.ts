export const getDateVI = () => {
    // Tạo một đối tượng Date từ chuỗi ngày tháng
    const date: any = new Date();

    // Mảng tên các tháng
    const monthsVI: string[] = [
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
    const daysVI: string[] = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    // Lấy thông tin ngày, tháng, năm, và tên của ngày trong tuần
    const day: any = date.getDate();
    const month: any = monthsVI[date.getMonth()];
    const year: any = date.getFullYear();
    const dateVI: any = daysVI[date.getDay()];

    // Tạo chuỗi định dạng mới
    const result: string = dateVI + ', ngày ' + day + ' ' + month + ' năm ' + year;

    return result;
};

export const getDateVI2 = () => {
    // Tạo một đối tượng Date từ chuỗi ngày tháng
    const date: any = new Date();

    // Mảng tên các tháng
    const monthsVI: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    // Mảng tên các ngày trong tuần
    const daysVI: string[] = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    // Lấy thông tin ngày, tháng, năm, và tên của ngày trong tuần
    const day: any = date.getDate();
    const month: any = monthsVI[date.getMonth()];
    const year: any = date.getFullYear();
    const dateVI: any = daysVI[date.getDay()];

    // Tạo chuỗi định dạng mới
    const result: string = dateVI + ', ' + day + '/' + month + '/' + year;

    return result;
};
