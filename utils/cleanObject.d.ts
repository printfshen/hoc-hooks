export declare const isVoid: (value: unknown) => boolean;
declare const cleanObject: (object: {
    [key: string]: unknown;
}) => {
    [x: string]: unknown;
};
export default cleanObject;
