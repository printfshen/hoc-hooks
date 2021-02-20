import { AxiosRequestConfig } from "axios";
export interface Pages {
    current: number;
    pageSize: number;
    total: number;
}
export interface ResponseData<T = []> {
    code: number;
    message: string;
    result: T;
    page: Pages;
    reqId: string;
}
declare type client = <T>(params?: any, config?: (AxiosRequestConfig | undefined)) => Promise<ResponseData<T>>;
declare const useAsyncTable: <T = any>(client: client, initialState?: any) => {
    loading: boolean;
    dataSource: T;
    params: {};
    pagination: Pages;
    handleChangeCondition: (data: any) => void;
    handleChangePageNo: (current: number) => void;
    handleChangePages: (pages: {
        current: number;
        pageSize?: number;
    }) => void;
    handleReset: () => void;
};
export default useAsyncTable;
