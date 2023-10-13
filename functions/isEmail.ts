export const isEmail = (email: string) => {
    const emailPattern: any = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};
