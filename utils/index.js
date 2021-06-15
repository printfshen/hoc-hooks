export const subset = (obj, keys) => {
    const filteredEntries = Object.entries(obj).filter(([key]) => keys.includes(key));
    return Object.fromEntries(filteredEntries);
};
export const resetRoute = () => (window.location.href = window.location.origin);
export const isVoid = (value) => value === undefined || value === null || value === "";
export const cleanObject = (object) => {
    const result = { ...object };
    Object.keys(result).forEach(key => {
        const value = result[key];
        isVoid(value) && delete result[key];
    });
    return result;
};
