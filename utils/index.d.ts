export declare const subset: <O extends {
    [x: string]: unknown;
}, K extends keyof O>(obj: O, keys: K[]) => Pick<O, K>;
export declare const resetRoute: () => string;
export declare const isVoid: (value: unknown) => boolean;
export declare const cleanObject: (object: {
    [key: string]: unknown;
}) => {
    [x: string]: unknown;
};
