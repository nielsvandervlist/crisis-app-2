import useAuth from '@/hooks/auth'
import {useEffect, useState} from 'react'
import {Fetcher} from 'ra-fetch'
import GetParticipants from '@/components/Participants/GetParticipants'
import FileUpload from '@/components/Forms/FileUpload'
import MultipleFileUpload from '@/components/Forms/MultipleFileUpload'

function CrisisForm({requestType, crisis, id, documents}) {

    const {user} = useAuth({middleware: 'auth'})

    const [title, setTitle] = useState(crisis ? crisis.data.title : '')
    const [description, setDescription] = useState(crisis ? crisis.data.description : '')
    const [company, setCompany] = useState(crisis ? crisis.data.company : '')
    const [status, setStatus] = useState(crisis ? crisis.data.status : 0)
    const [response, setResponse] = useState()
    const [errors, setErrors] = useState()
    const [companies, setCompanies] = useState({data: []})
    const [file, setFile] = useState()

    useEffect(() => {
        Fetcher.api('backend').index('companies')
            .then((res) => {
                setCompanies(res)
            })
            .catch(err => setErrors(err))
    }, [])

    function sendFiles(files, response) {
        files.forEach(file => {
            Fetcher.api('backend').store('documents', {
                'name': file.name,
                'crisis_id': response.data.id,
                'user_id': user.id,
                'url': file,
                'inserted': 0,
            })
        })
    }

    useEffect(() => {
        if (response && file) {
            sendFiles(file, response)
        }
    }, [response])

    if (!user) {
        return <></>
    }

    const params = {
        title: title,
        description: description,
        company_id: company,
        user_id: user.id,
        status: status,
    }

    if (id) {
        params.id = id
    }

    function submit(e) {
        e.preventDefault()
        if (requestType === 'store') {
            Fetcher.api('backend').store('crises', params)
                .then(response => setResponse(response))
                .catch(errors => setErrors(errors))
        }

        if (requestType === 'update') {
            Fetcher.api('backend').update('crises', params)
                .then(response => setResponse(response))
                .catch(errors => setErrors(errors))
        }
    }

    return <form className={'card col-span-12 form'}>
        <fieldset>
            <div className={'form__block'}>
                <label>Title</label>
                <input
                    type={'text'}
                    value={title}
                    placeholder={'Title'}
                    onChange={event => setTitle(event.target.value)}
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
                    onChange={event => setDescription(event.target.value)}
                    id={'description'}
                    name={'description'}
                />
            </div>
            {
                companies.data.length > 0 &&
                <div className={'form__block'}>
                    <label>Company</label>
                    <select
                        value={company}
                        onChange={event => setCompany(event.target.value)}
                        defaultValue={company.id ? company.name : 'Select a option'}
                    >
                        <option>Select a company</option>
                        {
                            companies.data.map((item, index) => {
                                return <option key={index} value={item.id}>{item.name}</option>
                            })
                        }
                    </select>
                </div>
            }
            <div className={'form__block'}>
                <label>Participants</label>
                {company && <GetParticipants company_id={company.id}/>}
            </div>
            <div className={'form__block'}>
                <label>Files</label>
                <MultipleFileUpload
                    filesOnly={true}
                    file={file}
                    documents={documents}
                    setFile={setFile}
                    label={'Submit your files'}
                />
            </div>
        </fieldset>
        <div className={'flex items-center'}>
            {response && <div className={'btn btn--success'}>Crisis created</div>}
            {errors && <div className={'btn btn--error'}>{errors.errors[0]}</div>}
            <button className={'btn btn--primary ml-auto mt-4'} onClick={(e) => submit(e)}>Submit</button>
        </div>
    </form>
}

export default CrisisForm
