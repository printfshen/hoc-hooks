import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { subset } from "../utils";
import useSetUrlSearchParam from "./useSetUrlSearchParam";
const useUrlQueryParam = (keys) => {
    const [searchParams] = useSearchParams();
    const setSearchParams = useSetUrlSearchParam();
    const [stateKeys] = useState(keys);
    return [
        useMemo(() => subset(Object.fromEntries(searchParams), stateKeys), [searchParams, stateKeys]),
        (params) => {
            return setSearchParams(params);
        },
    ];
};
export default useUrlQueryParam;
