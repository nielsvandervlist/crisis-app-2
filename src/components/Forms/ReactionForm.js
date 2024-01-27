import React, { useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { post } from '@/hooks/methods'

function ReactionForm({ requestType, id, reaction }) {
    const { user } = useAuth({ middleware: 'auth' })

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        src: '',
    })

    const {title, description, src} = formData
    const [errors, setErrors] = useState([])
    const [response, setResponse] = useState()

    if (!user) {
        return null
    }

    const handleChange = (e) => {
        console.log(e.target.files[0])

        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const params = {
            ...formData,
            user_id: user?.id,
            score: 1,
            timeline_post_id: 1,
            crisis_id: 1,
        }
        if (id) {
            params.id = id
        }

        void post('api/reactions', params, setResponse, setErrors)
    }

    return (
        <form className={'form'} onSubmit={handleSubmit}>
            <fieldset>
                <div className={'form__block'}>
                    <label>Title</label>
                    <input
                        type={'text'}
                        value={title}
                        placeholder={'Title'}
                        onChange={handleChange}
                        id={'title'}
                        name={'title'}
                    />
                </div>
                <div className={'form__block'}>
                    <label>Description</label>
                    <input
                        type={'text'}
                        value={description}
                        placeholder={'Description'}
                        onChange={handleChange}
                        id={'description'}
                        name={'description'}
                    />
                </div>
                <div className={'form__block'}>
                    <label>Src</label>
                    <input
                        type={'text'}
                        value={src}
                        placeholder={'Src'}
                        onChange={handleChange}
                        id={'src'}
                        name={'src'}
                    />
                </div>
            </fieldset>
            <div className={'flex items-center'}>
                {!errors.length && response && <div className={'btn btn--success'}>Reaction created</div>}
                {errors.length > 0 && <div className={'btn btn--error'}>{errors[0]}</div>}
                <button className={'btn btn--primary ml-auto mt-4'} type="submit">Submit</button>
            </div>
        </form>
    )
}

export default ReactionForm
