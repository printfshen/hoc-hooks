interface State<D> {
    error: Error | null;
    data: D | null;
    stat: "idle" | "loading" | "error" | "success";
}
export declare const useAsync: <D>(initialState?: State<D> | undefined, initialConfig?: {
    throwOnError: boolean;
} | undefined) => {
    error: Error | null;
    data: D | null;
    stat: "idle" | "loading" | "error" | "success";
    isIdle: boolean;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    run: (promise: Promise<D>, runConfig?: {
        retry: () => Promise<D>;
    } | undefined) => Promise<any>;
    setData: (data: D) => void;
    setError: (error: Error) => void;
    retry: () => void;
};
export default useAsync;
