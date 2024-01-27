import {useEffect, useState} from 'react'
import {Fetcher, useApi, useIndex} from 'ra-fetch'
import useAuth from '@/hooks/auth'

function TimelineForm({duration, setDuration, title, setTitle, setTimeline, crisis, setCrisis, company, setCompany}) {

    const {user} = useAuth({middleware: 'auth'})
    const [response, setResponse] = useState()
    const [errors, setErrors] = useState()
    const [crises, setCrises] = useState()

    const companies = useApi('backend').index('companies')

    function submit(e) {
        e.preventDefault()
        Fetcher.api('backend').store('timelines', {
            title: title,
            duration: duration,
            company_id: company,
            crisis_id: crisis,
            user_id: user.id,
            online: 0,
            time: 0,
        })
            .then(response => setTimeline(response))
            .catch(errors => setErrors(errors))
    }

    useEffect(() => {
        if(user?.id){
            Fetcher.api('backend').index('crises').then(res => setCrises(res)).catch(err => console.log(err))
        }

    }, [user?.id])

    return <form className={'card col-span-8 form'}>
        <fieldset className={'grid grid-cols-12 gap-4'}>
            <h3 className={'col-span-12'}>Timeline form</h3>
            <div className={'form__block col-span-12'}>
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
            <div className={'form__block col-span-6'}>
                <label>Duration in hours</label>
                <input
                    type={'number'}
                    value={duration}
                    onChange={event => setDuration(event.target.value)}
                    id={'duration'}
                    name={'duration'}
                />
            </div>
            <div className={'form__block col-span-6'}>
                <label>Company</label>
                <select
                    value={company}
                    onChange={event => setCompany(event.target.value)}
                >
                    <option>Select a option</option>
                    {
                        companies[0].data.map((company, index) => {
                            return <option key={index} value={company.id}>{company.name}</option>
                        })
                    }
                </select>
            </div>
            {
                crises && !crises.loading && crises.data.length > 0 &&
                <div className={'form__block col-span-6'}>
                    <label>Crisis</label>
                    <select
                        value={crisis}
                        onChange={event => setCrisis(event.target.value)}
                    >
                        <option>Select a option</option>
                        {
                            crises.data.map((crisis, index) => {
                                return <option key={index} value={crisis.id}>{crisis.title}</option>
                            })
                        }
                    </select>
                </div>
            }
        </fieldset>
        <div className={'flex items-center'}>
            {response && <div className={'btn btn--success'}>Timeline created</div>}
            {errors && <div className={'btn btn--error'}>{errors.errors[0]}</div>}
            <button className={'btn btn--primary ml-auto mt-4'} onClick={(e) => submit(e)}>Submit</button>
        </div>
    </form>
}

export default TimelineForm
