import sizeOf from 'image-size';

export const reduceBase64 = (base64String: string) => {
    // Chuyển chuỗi base64 thành ArrayBuffer
    const binaryString = window.atob(base64String.split(',')[1]);
    const binaryBuffer: any = new ArrayBuffer(binaryString.length);
    const binaryArray: any = new Uint8Array(binaryBuffer);

    for (let i = 0; i < binaryString.length; i++) {
        binaryArray[i] = binaryString.charCodeAt(i);
    }

    // Lấy kích thước của ảnh
    const dimensions: any = sizeOf(binaryBuffer);

    // Giảm kích thước của ảnh nếu cần
    const maxWidth: any = 800;
    const maxHeight: any = 600;

    if (dimensions.width > maxWidth || dimensions.height > maxHeight) {
        const scaleFactor = Math.min(maxWidth / dimensions.width, maxHeight / dimensions.height);

        const canvas: any = document.createElement('canvas');
        canvas.width = dimensions.width * scaleFactor;
        canvas.height = dimensions.height * scaleFactor;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(
            new Uint8Array(binaryBuffer),
            0,
            0,
            dimensions.width,
            dimensions.height,
            0,
            0,
            canvas.width,
            canvas.height,
        );

        const reducedBase64 = canvas.toDataURL('image/jpeg');
        console.log(reducedBase64);
    } else {
        console.log(base64String);
    }
};
