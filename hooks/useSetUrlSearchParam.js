import { useSearchParams } from "react-router-dom";
import { cleanObject } from "../utils";
const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParam] = useSearchParams();
    return (params) => {
        const o = cleanObject({
            ...Object.fromEntries(searchParams),
            ...params,
        });
        return setSearchParam(o);
    };
};
export default useSetUrlSearchParam;
