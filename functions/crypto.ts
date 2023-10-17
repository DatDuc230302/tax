import crypto from 'crypto';

export function encrypt(text: string, secretKey: string) {
    const mykey: any = crypto.createCipher('aes-128-cbc', secretKey);
    const mystr: any = mykey.update(text, 'utf8', 'hex');
    const valueEncrypt = mystr + mykey.final('hex');
    return valueEncrypt;
}

export function decrypt(encryptedText: string, secretKey: string) {
    const mykey: any = crypto.createDecipher('aes-128-cbc', secretKey);
    const mystr: any = mykey.update(encryptedText, 'hex', 'utf8');
    const valueDecrypt: any = mystr + mykey.final('utf8');
    return valueDecrypt;
}
