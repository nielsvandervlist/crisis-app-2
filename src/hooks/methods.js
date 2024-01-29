import axios from '@/lib/axios'

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


export async function get(url, params) {
    try {
        let res = await axios.get(url, {params: params})
        return res.data
    } catch (error) {
        return error
    }
}

const csrf = () => axios.get('/sanctum/csrf-cookie')

export async function store(url, props, setFormData, setErrors) {
    await csrf()

    axios
        .post(url, form(props))
        .then((res) => {
            setFormData(res)
        })
        .catch(error => {
            if (error.response.status !== 422) throw error

            setErrors(error.response.data.errors)
        })
}

export async function update(url, props, setFormData, setErrors) {
    await csrf()

    setErrors([])

    axios
        .post(url, form({ ...props, _method: 'PUT' }), {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            setFormData(res)
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
