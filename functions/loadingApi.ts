export const loadingApi = (apiFunction: any, setLoading: any) => {
    return async (...args: any) => {
        setLoading(true);
        try {
            const response = await apiFunction(...args);
            return response;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };
};
