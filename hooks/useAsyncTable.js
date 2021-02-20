var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var reducer = function (state, action) {
    var type = action.type, payload = action.payload;
    switch (type) {
        case actionTypes.SET_LOADING:
            return __assign(__assign({}, state), { loading: payload });
        case actionTypes.SET_DATA_SOURCE:
            return __assign(__assign({}, state), { dataSource: payload });
        case actionTypes.SET_PAGES:
            return __assign(__assign({}, state), { params: __assign(__assign({}, state.params), payload) });
        case actionTypes.SET_SEARCH_DATA:
            return __assign(__assign({}, state), { params: __assign(__assign({}, state.params), payload) });
        case actionTypes.RESET:
            return __assign(__assign({}, state), payload);
        default:
            return state;
    }
};
var useAsyncTable = function (client, initialState) {
    var DEFAULT_STATE = {
        loading: false,
        order: {},
        field: {},
        dataSource: [],
        params: {},
    };
    var _a = useState({
        current: 1,
        pageSize: 6,
        total: 0
    }), pagination = _a[0], setPagination = _a[1];
    var _b = useReducer(reducer, __assign(__assign({}, DEFAULT_STATE), initialState)), _c = _b[0], loading = _c.loading, dataSource = _c.dataSource, params = _c.params, dispatch = _b[1];
    var core = function () { return __awaiter(void 0, void 0, void 0, function () {
        var condition, res, result, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch({ type: actionTypes.SET_LOADING, payload: true });
                    condition = __assign({}, params);
                    return [4 /*yield*/, client(condition)];
                case 1:
                    res = _a.sent();
                    if (!res) return [3 /*break*/, 4];
                    result = res.result, page = res.page;
                    return [4 /*yield*/, dispatch({ type: actionTypes.SET_DATA_SOURCE, payload: result })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, setPagination(page)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    dispatch({ type: actionTypes.SET_LOADING, payload: false });
                    return [2 /*return*/];
            }
        });
    }); };
    var coreWarp = useCallback(core, [params]);
    useEffect(function () {
        coreWarp();
    }, [coreWarp]);
    // 改变分页
    var handleChangePages = function (pages) {
        dispatch({
            type: actionTypes.SET_PAGES,
            payload: pages
        });
    };
    var handleChangePageNo = function (current) {
        handleChangePages({ current: current });
    };
    // 改变查询条件
    var handleChangeCondition = function (data) {
        dispatch({ type: actionTypes.SET_SEARCH_DATA, payload: data });
    };
    var handleReset = function () {
        dispatch({ type: actionTypes.RESET, payload: DEFAULT_STATE });
    };
    return {
        loading: loading,
        dataSource: dataSource,
        params: params,
        pagination: pagination,
        handleChangeCondition: handleChangeCondition,
        handleChangePageNo: handleChangePageNo,
        handleChangePages: handleChangePages,
        handleReset: handleReset
    };
};
export default useAsyncTable;
