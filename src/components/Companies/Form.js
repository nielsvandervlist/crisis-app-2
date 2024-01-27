import {useEffect, useState} from 'react'
import {Fetcher, useApi, useIndex} from 'ra-fetch'
import useAuth from '@/hooks/auth'

function Form({requestType, id, company}) {

    const {user} = useAuth({middleware: 'auth'})

    const [name, setName] = useState(company ? company.data.name : '')
    const [description, setDescription] = useState(company ? company.data.description : '')
    const [response, setResponse] = useState()
    const [errors, setErrors] = useState()

    if (!user) {
        return <></>
    }

    const params = {
        name: name,
        description: description,
        user_id: user.id,
    }

    if (id) {
        params.id = id
    }

    function submit(e) {
        e.preventDefault()
        if (requestType === 'store') {
            Fetcher.api('backend').store('companies', params)
                .then(response => setResponse(response))
                .catch(errors => setErrors(errors))
        }

        if (requestType === 'update') {
            Fetcher.api('backend').update('companies', params)
                .then(response => setResponse(response))
                .catch(errors => setErrors(errors))
        }
    }

    return <form className={'card col-span-12 form'}>
        <fieldset>
            <div className={'form__block'}>
                <label>Name</label>
                <input
                    type={'text'}
                    value={name}
                    placeholder={'Name'}
                    onChange={event => setName(event.target.value)}
                    id={'name'}
                    name={'name'}
                />
            </div>
            <div className={'form__block'}>
                <label>Description</label>
                <input
                    type={'text'}
                    value={description}
                    placeholder={'Description'}
                    onChange={event => setDescription(event.target.value)}
                    id={'description'}
                    name={'description'}
                />
            </div>
        </fieldset>
        <div className={'flex items-center'}>
            {response && <div className={'btn btn--success'}>Company created</div>}
            {errors && <div className={'btn btn--error'}>{errors.errors[0]}</div>}
            <button className={'btn btn--primary ml-auto mt-4'} onClick={(e) => submit(e)}>Submit</button>
        </div>
    </form>
}

export default Form
