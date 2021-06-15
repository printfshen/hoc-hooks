import { useState } from "react";
const useArray = (initialArray) => {
    const [value, setValue] = useState(initialArray);
    return {
        value,
        setValue,
        add: (item) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index) => {
            const copy = [...value];
            copy.splice(index, 1);
            setValue(copy);
        },
    };
};
export default useArray;
