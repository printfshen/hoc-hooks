interface State<T> {
    error: Error | null;
    data: T | null;
    stat: "idle" | "loading" | "error" | "success";
}
declare const useAsync: <T>(initialState?: State<T> | undefined, initialConfig?: {
    throwOnError: boolean;
} | undefined) => {
    error: Error | null;
    data: T | null;
    stat: "idle" | "loading" | "error" | "success";
    isIdle: boolean;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    run: (promise: Promise<T>) => Promise<any>;
    setData: (data: T) => void;
    setError: (error: Error) => void;
};
export default useAsync;
