import {useEffect} from 'react'
import { useAuthContext } from "@/components/Layouts/AuthContext"
import { useHandle } from "@/hooks/useHandle"

function Form({requestType, id, company}) {

    const user = useAuthContext();
    const fieldsArray = ['name', 'email', 'company_id']
    const url = requestType === 'post' ? '/api/participants' : `/api/participants/${id}`
    const params = {
      user_id: user?.id,
    }

    console.log(user)

    let {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        response,
        errors
    } = useHandle(fieldsArray, url, requestType, params)

    let { name, email, company_id } = formData

    useEffect(() => {
        if (company && company.data) {
            setFormData({...company.data})
        }
    }, [setFormData])

    if (!user) {
        return <></>
    }

    return <form className={'card col-span-12 form'}>
        <fieldset>
            <div className={'form__block'}>
                <label>Name</label>
                <input
                    type={'text'}
                    value={formData.name}
                    placeholder={'Name'}
                    onChange={handleChange}
                    id={'name'}
                    name={'name'}
                />
            </div>
            <div className={'form__block'}>
                <label>Description</label>
                <input
                    type={'text'}
                    value={formData.description}
                    placeholder={'Description'}
                    onChange={handleChange}
                    id={'description'}
                    name={'description'}
                />
            </div>
        </fieldset>
        <div className={'flex items-center'}>
            {response && <div className={'btn btn--success'}>Company created</div>}
            {/*{errors && <div className={'btn btn--error'}>{errors.errors[0]}</div>}*/}
            <button className={'btn btn--primary ml-auto mt-4'} onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    </form>
}

export default Form
