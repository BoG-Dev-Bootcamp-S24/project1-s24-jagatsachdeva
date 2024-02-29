import { useState, useEffect } from 'react';

export const useFetch = (url) => {

    const [isPending, setIsPending] = useState(true);
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then((data) => setData(data))
    },[url]);
    console.log(data);
    return data;
}