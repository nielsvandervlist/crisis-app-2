import { useState } from 'react';

export const useHandle = (fieldsArray) => {
    const initialFormData = {};
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
        e.preventDefault();
        // Add your handleSubmit logic here
    };

    return { formData, handleChange, handleFile, handleSubmit };
};
