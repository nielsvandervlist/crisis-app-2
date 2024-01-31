import axios from '@/lib/axios'
import useSWR from 'swr'
import {useEffect, useState} from 'react'

const createForm = (formData, params, key = null) => {
    for (let i in params) {
        if (!Object.prototype.hasOwnProperty.call(params, i)) {
            continue;
        }

        let formKey = key ? key + `[${i}]` : i;

        if (Array.isArray(params[i]) && !params[i].length) {
            formData.append(formKey, params[i]);
            continue;
        }

        if (
            params[i] !== null &&
            (Array.isArray(params[i]) || typeof params[i] === 'object') &&
            !(params[i] instanceof File || params[i] instanceof Date)
        ) {
            formData = createForm(formData, params[i], null);
            continue;
        }

        // Return null values as empty string, because the back-end will receive a string "null" which is super annoying.
        formData.append(formKey, params[i] === null ? '' : params[i]);
    }

    return formData;
};

function form(params) {
    let formData = new FormData();
    return createForm(formData, params);
}

export function useGet(url, params) {
    const { data: initialData, error } = useSWR(url, () =>
        axios.get(url, { params })
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error;
                // Handle specific error codes as needed
            })
    );

    const [data, setData] = useState(null); // Set initial data to null

    // Update data state when initialData changes
    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    return {
        data,
        setData,
        isLoading: !data && !error,
        isError: error
    };
}


const csrf = () => axios.get('/sanctum/csrf-cookie')

export async function store(url, data, setResponse, setErrors) {
    await csrf()

    axios
        .post(url, form(data))
        .then((res) => {
            setResponse(res.data)
        })
        .catch(error => {
            if (error.response.status !== 422) throw error

            setErrors(error.response.data.errors)
        })
}

export async function update(url, data, setResponse, setErrors) {
    await csrf()

    setErrors([])

    axios
        .post(url, form({ ...data, _method: 'PUT' }), {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            setResponse(res.data)
        })
        .catch(error => {
            if (error.response.status !== 422) throw error

            setErrors(error.response.data.errors)
        })
}

export async function del(url, setErrors) {

    setErrors([])

    try {
        let res = await axios.delete(url)

        return await res.data
    } catch (error) {
        setErrors(error.response.data.errors)
    }
}
