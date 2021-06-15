/// <reference types="react" />
declare const useArray: <T>(initialArray: T[]) => {
    value: T[];
    setValue: import("react").Dispatch<import("react").SetStateAction<T[]>>;
    add: (item: T) => void;
    clear: () => void;
    removeIndex: (index: number) => void;
};
export default useArray;
