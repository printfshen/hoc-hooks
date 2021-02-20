import { useEffect } from "react";
var useMount = function (fn) {
    useEffect(fn, []);
};
export default useMount;
