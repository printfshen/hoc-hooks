import { useCallback, useState } from "react";
const useForceUpdate = () => {
    const [, setValue] = useState(0);
    return useCallback(() => {
        setValue(val => (val + 1) % (Number.MAX_SAFE_INTEGER - 1));
    }, []);
};
export default useForceUpdate;
