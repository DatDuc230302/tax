export const getNameFile = (file: string) => {
    const fileName = file.split('/').pop(); // Lấy tên tệp từ đường dẫn bằng cách tách theo dấu '/'
    return fileName;
};
