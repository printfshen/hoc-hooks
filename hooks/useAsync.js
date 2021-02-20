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
import { useState } from "react";
var defaultInitialState = {
    stat: "idle",
    data: null,
    error: null,
};
var defaultConfig = {
    throwOnError: false,
};
var useAsync = function (initialState, initialConfig) {
    var config = __assign(__assign({}, defaultConfig), initialConfig);
    var _a = useState(__assign(__assign({}, defaultInitialState), initialState)), state = _a[0], setState = _a[1];
    var setData = function (data) {
        setState({
            data: data,
            stat: "success",
            error: null
        });
    };
    var setError = function (error) {
        return setState({
            error: error,
            stat: "error",
            data: null,
        });
    };
    var run = function (promise) {
        if (!promise || !promise.then) {
            throw new Error("非 Promise 类型数据");
        }
        setState(__assign(__assign({}, state), { stat: "loading" }));
        return promise
            .then(function (data) {
            setData(data);
            return data;
        })
            .catch(function (error) {
            setError(error);
            if (config.throwOnError)
                return Promise.reject(error);
            return error;
        });
    };
    return __assign({ isIdle: state.stat === "idle", isLoading: state.stat === "loading", isError: state.stat === "error", isSuccess: state.stat === "success", run: run,
        setData: setData,
        setError: setError }, state);
};
export default useAsync;
