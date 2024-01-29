import { useState } from 'react';
import {store, update} from '@/hooks/methods'

export const useHandle = (fieldsArray, url, type, params) => {

    const [response, setResponse] = useState()
    const [errors, setErrors] = useState([])

    const initialFormData = {};
    // Initialize the form data
    fieldsArray.forEach(field => {
        initialFormData[field] = '';
    });
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFile = (e) => {
        const { name } = e.target;
        if (e.target.files[0]) {
            setFormData(prevState => ({
                ...prevState,
                [name]: e.target.files[0]
            }));
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            ...formData,
            ...params
        }

        if(type === 'post') {
            void store(url, data, setResponse, setErrors)
        }
        else {
            void update(url, data, setResponse, setErrors)
        }
    }

    return { formData, setFormData, handleChange, handleFile, handleSubmit, response, errors };
};
