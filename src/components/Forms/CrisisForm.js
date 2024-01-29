// import GetParticipants from '@/components/Participants/GetParticipants'
// import FileUpload from '@/components/Forms/FileUpload'
// import MultipleFileUpload from '@/components/Forms/MultipleFileUpload'
import useGetData from '@/hooks/useGetData'
import {useHandle} from '@/hooks/useHandle'

function CrisisForm({requestType, crisis, id, documents}) {

    const fieldsArray = ['title', 'description', 'company_id', 'status']
    const [companies] = useGetData('/api/companies')
    const url = requestType === 'post' ? '/api/crises' : `/api/crises/${id}`

    const params = {
        'user_id': 1,
        'status': 0,
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

    let { title, description, company_id, status } = formData
    //
    // function sendFiles(files, response) {
    //     files.forEach(file => {
    //         Fetcher.api('backend').store('documents', {
    //             'name': file.name,
    //             'crisis_id': response.data.id,
    //             'user_id': user.id,
    //             'url': file,
    //             'inserted': 0,
    //         })
    //     })
    // }

    // useEffect(() => {
    //     if (response && file) {
    //         sendFiles(file, response)
    //     }
    // }, [response])

    function submit(e) {
        handleSubmit(e)
    }

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
                <label>Participants</label>
                {/*{company && <GetParticipants company_id={company.id}/>}*/}
            </div>
            <div className={'form__block'}>
                <label>Files</label>
                {/*<MultipleFileUpload*/}
                {/*    filesOnly={true}*/}
                {/*    file={file}*/}
                {/*    documents={documents}*/}
                {/*    setFile={setFile}*/}
                {/*    label={'Submit your files'}*/}
                {/*/>*/}
            </div>
        </fieldset>
        <div className={'flex items-center'}>
            {response && <div className={'btn btn--success'}>Crisis created</div>}
            {/*{errors && <div className={'btn btn--error'}>{errors.errors[0]}</div>}*/}
            <button className={'btn btn--primary ml-auto mt-4'} onClick={(e) => submit(e)}>Submit</button>
        </div>
    </form>
}

export default CrisisForm
