import { useEffect } from "react";
function useDocumentTitle(title) {
    useEffect(function () {
        document.title = title;
        return function () {
            document.title = "Loading...";
        };
    }, [title]);
}
export default useDocumentTitle;
