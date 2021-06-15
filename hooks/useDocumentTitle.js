import { useEffect } from "react";
function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title;
        return () => {
            document.title = "Loading...";
        };
    }, [title]);
}
export default useDocumentTitle;
