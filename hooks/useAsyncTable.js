import { useCallback, useEffect, useReducer, useState } from "react";
var actionTypes;
(function (actionTypes) {
    // 设置loading
    actionTypes["SET_LOADING"] = "SET_LOADING";
    // 设置 dataSource
    actionTypes["SET_DATA_SOURCE"] = "SET_DATA_SOURCE";
    // 设置 pages
    actionTypes["SET_PAGES"] = "SET_PAGES";
    // 设置 搜索数据
    actionTypes["SET_SEARCH_DATA"] = "SET_SEARCH_DATA";
    // 重置
    actionTypes["RESET"] = "RESET";
})(actionTypes || (actionTypes = {}));
const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_LOADING:
            return { ...state, ...{ loading: payload } };
        case actionTypes.SET_DATA_SOURCE:
            return { ...state, ...{ dataSource: payload } };
        case actionTypes.SET_PAGES:
            return { ...state, ...{ params: { ...state.params, ...payload } } };
        case actionTypes.SET_SEARCH_DATA:
            return { ...state, ...{ params: { ...state.params, ...payload } } };
        case actionTypes.RESET:
            return { ...state, ...payload };
        default:
            return state;
    }
};
const useAsyncTable = (client, initialState) => {
    const DEFAULT_STATE = {
        loading: false,
        order: {},
        field: {},
        dataSource: [],
        params: {},
    };
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 6,
        total: 0
    });
    const [{ loading, dataSource, params, }, dispatch] = useReducer(reducer, {
        ...DEFAULT_STATE,
        ...initialState
    });
    const core = async () => {
        dispatch({ type: actionTypes.SET_LOADING, payload: true });
        let condition = { ...params };
        const res = await client(condition);
        if (res) {
            const { result, page } = res;
            await dispatch({ type: actionTypes.SET_DATA_SOURCE, payload: result });
            await setPagination(page);
        }
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
    };
    const coreWarp = useCallback(core, [params]);
    useEffect(() => {
        coreWarp();
    }, [coreWarp]);
    // 改变分页
    const handleChangePages = (pages) => {
        dispatch({
            type: actionTypes.SET_PAGES,
            payload: pages
        });
    };
    const handleChangePageNo = (current) => {
        handleChangePages({ current });
    };
    // 改变查询条件
    const handleChangeCondition = (data) => {
        dispatch({ type: actionTypes.SET_SEARCH_DATA, payload: data });
    };
    const handleReset = () => {
        dispatch({ type: actionTypes.RESET, payload: DEFAULT_STATE });
    };
    return {
        loading,
        dataSource,
        params,
        pagination,
        handleChangeCondition,
        handleChangePageNo,
        handleChangePages,
        handleReset
    };
};
export default useAsyncTable;
