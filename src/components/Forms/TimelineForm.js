import {useGet} from '@/hooks/methods'
import {useAuthContext} from '@/components/Layouts/AuthContext'
import {useHandle} from '@/hooks/useHandle'
import {useEffect} from 'react'

function TimelineForm({timeline, requestType}) {

    const user = useAuthContext()
    const [crises, setCrises] = useGet('/api/crises', {user: user?.id})
    const [companies, setCompanies] = useGet('/api/companies', {user: user?.id})
    const url = requestType === 'post' ? '/api/timelines' : `/api/timelines/${timeline.data.id}`
    const fieldsArray = ['title', 'duration', 'company_id', 'crisis_id', 'online', 'time', 'user_id']
    const edit = requestType === 'update' ? timeline.data : null

    const params = {
        user_id: user?.id,
        online: 0,
        time: 0,
    }

    let {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        response,
        errors
    } = useHandle(fieldsArray, url, requestType, params, edit)

    useEffect(() => {
        if (timeline && timeline.data) {
            setFormData({...timeline.data})
        }
    }, [setFormData])

    return <form className={'card col-span-8 form'}>
        <fieldset className={'grid grid-cols-12 gap-4'}>
            <h3 className={'col-span-12'}>Timeline form</h3>
            <div className={'form__block col-span-12'}>
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
            <div className={'form__block col-span-6'}>
                <label>Duration in hours</label>
                <input
                    type={'number'}
                    value={formData.duration}
                    onChange={handleChange}
                    id={'duration'}
                    name={'duration'}
                />
            </div>
            {
                companies && companies.data &&
                <div className={'form__block col-span-6'}>
                    <label>Company</label>
                    <select
                        value={formData.company}
                        onChange={handleChange}
                        name={'company_id'}
                    >
                        <option>Select a option</option>
                        {
                            companies.data.map((company, index) => {
                                return <option name={company.name} key={index} value={company.id}>{company.name}</option>
                            })
                        }
                    </select>
                </div>
            }
            {
                crises && !crises.loading && crises.data.length > 0 &&
                <div className={'form__block col-span-6'}>
                    <label>Crisis</label>
                    <select
                        name={'crisis_id'}
                        value={formData.crisis}
                        onChange={handleChange}
                    >
                        <option>Select a option</option>
                        {
                            crises.data.map((crisis, index) => {
                                return <option name={crisis.title} key={index} value={crisis.id}>{crisis.title}</option>
                            })
                        }
                    </select>
                </div>
            }
        </fieldset>
        <div className={'flex items-center'}>
            {response && <div className={'btn btn--success'}>Timeline created</div>}
            {/*{errors && <div className={'btn btn--error'}>{errors.errors[0]}</div>}*/}
            <button className={'btn btn--primary ml-auto mt-4'} onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    </form>
}

export default TimelineForm
