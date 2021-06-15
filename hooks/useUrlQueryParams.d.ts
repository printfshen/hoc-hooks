declare const useUrlQueryParam: <K extends string>(keys: K[]) => readonly [{ [key in K]: string; }, (params: Partial<{ [key_1 in K]: unknown; }>) => void];
export default useUrlQueryParam;
