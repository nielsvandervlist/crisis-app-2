import {useEffect, useState} from 'react'
import {useAuth} from '@/hooks/auth'
import useGetData from '@/hooks/useGetData'
import {useHandle} from '@/hooks/useHandle'

function ParticipantForm({requestType, id, participant}){
    const {user} = useAuth({middleware: 'auth'})
    const [companies, setCompanies] = useGetData('/api/companies')
    const [companyId, setCompanyId] = useState()

    const fieldsArray = ['name', 'email', 'company_id']
    const url = requestType === 'post' ? '/api/participants' : `/api/participants/${id}`

    //TODO set company id right
    const params = {
        user_id: user.id,
        company_id: 1,
    }

    let {
        formData,
        setFormData,
        handleChange,
        handleFile,
        handleSubmit,
        response,
        errors
    } = useHandle(fieldsArray, url, requestType, params)

    let { name, email, company_id } = formData

    useEffect(() => {
        if (participant && participant.data) {
            setFormData({...participant.data})
        }
    }, [setFormData])

    if (!user || !companies) {
        return <></>
    }

    return <form className={'card col-span-12 form'}>
        <fieldset>
            <div className={'form__block'}>
                <label>Name</label>
                <input
                    type={'text'}
                    value={name}
                    placeholder={'Name'}
                    onChange={handleChange}
                    id={'name'}
                    name={'name'}
                />
            </div>
            <div className={'form__block'}>
                <label>Email</label>
                <input
                    type={'text'}
                    value={email}
                    placeholder={'Email'}
                    onChange={handleChange}
                    id={'email'}
                    name={'email'}
                />
            </div>
            {!companies.loading && <div className={'form__block'}>
                <label>Company</label>
                <select
                    value={companyId}
                    onChange={handleChange}
                >
                    <option>Select a option</option>
                    {
                        companies.data.map((company, index) => {
                            return <option key={index} value={company.id}>{company.name}</option>
                        })
                    }
                </select>
            </div>}
        </fieldset>
        <div className={'flex items-center'}>
            {response && <div className={'btn btn--success'}>Participant created</div>}
            {/*{errors && <div className={'btn btn--error'}>{errors.errors[0]}</div>}*/}
            <button className={'btn btn--primary ml-auto mt-4'} onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    </form>
}

export default ParticipantForm
