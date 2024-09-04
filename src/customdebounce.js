import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
    const [searchedValue, setSerchedValue] = useState(value);

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setSerchedValue(value);
        },delay);

        return () =>{
            clearTimeout(handler);
        }
    },[value, delay]);

    return searchedValue;
}

export default useDebounce