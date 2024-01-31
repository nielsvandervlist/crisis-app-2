import useGetData from '@/hooks/useGetData'
import {useHandle} from '@/hooks/useHandle'
import {useAuth} from '@/hooks/auth'
import GetParticipants from '@/components/Participants/GetParticipants'
import MultipleFileUpload from '@/components/Forms/MultipleFileUpload'
import {store} from '@/hooks/methods'
import {useEffect, useState} from 'react'

function CrisisForm({requestType, crisis, id, documents}) {

    const {user} = useAuth({middleware: 'auth'})
    const fieldsArray = ['title', 'description', 'company_id', 'status']
    const [companies] = useGetData('/api/companies')
    const url = requestType === 'post' ? '/api/crises' : `/api/crises/${id}`
    const [file, setFile] = useState()
    const edit = requestType === 'update' ? crisis.data : null

    const params = {
        'user_id': user?.id,
        'status': 0,
    }

    let {
        formData,
        handleChange,
        handleSubmit,
        response,
    } = useHandle(fieldsArray, url, requestType, params, edit)

    let { title, description, company_id, status } = formData

    if(!companies){
        return <></>
    }

    return <form className={'card col-span-12 form'}>
        <fieldset>
            <div className={'form__block'}>
                <label>Title</label>
                <input
                    type={'text'}
                    value={formData.title}
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
                    value={formData.description}
                    placeholder={'Description'}
                    onChange={handleChange}
                    id={'description'}
                    name={'description'}
                />
            </div>
            {
                companies.data.length > 0 &&
                <div className={'form__block'}>
                    <label>Company</label>
                    <select
                        value={formData.company_id}
                        name={'company_id'}
                        onChange={handleChange}
                    >
                        <option>Select a company</option>
                        {
                            companies.data.map((item, index) => {
                                return <option name={item.name} key={index} value={item.id}>{item.name}</option>
                            })
                        }
                    </select>
                </div>
            }
            <div className={'form__block'}>
                <label className={'my-6 font-bold text-lg'}>Participants</label>
                {crisis?.data.company && <GetParticipants company_id={crisis?.data.company.id}/>}
            </div>
            <div className={'form__block'}>
                <label className={'my-6 font-bold text-lg'}>Files</label>
                <MultipleFileUpload
                    response={response}
                    filesOnly={true}
                    file={file}
                    documents={documents}
                    setFile={setFile}
                    label={'Upload documents for crisis'}
                />
            </div>
        </fieldset>
        <div className={'flex items-center'}>
            {response && <div className={'btn btn--success'}>Crisis created</div>}
            {/*{errors && <div className={'btn btn--error'}>{errors.errors[0]}</div>}*/}
            <button className={'btn btn--primary ml-auto mt-4'} onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    </form>
}

export default CrisisForm
