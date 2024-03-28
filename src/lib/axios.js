import Axios from 'axios'

const axios = Axios.create({
    baseURL: `https://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
})

export default axios
