import { useState, useEffect } from 'react';
import { get } from './methods.js';

function useGetData(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const controller = new AbortController();
            const signal = controller.signal;

            try {
                const result = await get(url, { signal });
                setData(result);
            } catch(error) {
                if (error.name === 'AbortError') {
                    // Request was cancelled
                } else {
                    // Handle other errors
                }
            }

            return () => {
                controller.abort(); // Cancel the ongoing request when the component unmounts
            };
        };

        void fetchData();
    }, [url]);

    return [data, setData];
}

export default useGetData;
