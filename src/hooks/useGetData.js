import { useState, useEffect } from 'react';
import { get } from './methods.js';

function useGetData(url, params) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const result = await get(url, params);
                setData(result);
            } catch(error) {
                if (error.name === 'AbortError') {
                    // Request was cancelled
                } else {
                    // Handle other errors
                }
            }

            return () => {
                // Cancel the request
            };
        };

        void fetchData();
    }, [url]);

    return [data, setData];
}

export default useGetData;
