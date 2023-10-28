import diacritic from 'diacritic';

export function removeDiacriticsAndSpaces(str) {
    const processedString = diacritic.clean(str).replace(/\s+/g, '-');
    return processedString.toLowerCase(); // Đưa về chữ thường (tuỳ chọn)
}
