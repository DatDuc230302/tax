export const getNameFiles = (filesArr: string[]) => {
    const formattedFiles = filesArr.map((filePath: any) => {
        const fileName = filePath.split('/').pop(); // Lấy tên tệp từ đường dẫn bằng cách tách theo dấu '/'
        return { nameFile: fileName };
    });

    return formattedFiles;
};
