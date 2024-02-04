import {useEffect} from 'react'
import Link from 'next/link'
import {useHandle} from '@/hooks/useHandle'
import {useGet} from '@/hooks/methods'

function RapportForm({requestType, id, rapport}) {

    const [crises, setCrisis, isLoading] = useGet('/api/crises')
    const fieldsArray = ['title', 'description', 'reaction_score', 'sharing_score', 'content_score', 'crisis_id']
    const url = requestType === 'post' ? '/api/rapports' : `/api/rapports/${id}`

    const params = {

    }

    let {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        response,
        errors
    } = useHandle(fieldsArray, url, requestType, params)

    let { title, description, reaction_score, sharing_score, content_score, crisis_id } = formData

    useEffect(() => {
        if (rapport && rapport.data) {
            setFormData({...rapport.data})
        }
    }, [setFormData])

    if (isLoading || !crises) {
        return <></>
    }

    return <form className={'card col-span-6 form'}>

        <h3 className={'mb-4'}>Creating a new rapport</h3>
        <p className={'mb-4'}>Rapports can be created once a crisis is finished</p>
        <p className={'mb-8'}>Create a <Link className={'underline'} href={'/create/crisis'}>crisis</Link> before you create a rapport</p>

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
                    placeholder={'Email'}
                    onChange={handleChange}
                    id={'description'}
                    name={'description'}
                />
            </div>
            {!crises.loading && <div className={'form__block'}>
                <label>Crisis</label>
                <select
                    value={formData.crisis_id}
                    onChange={handleChange}
                    name={'crisis_id'}
                >
                    <option>Select a option</option>
                    {
                        crises.data.map((crisis, index) => {
                            return <option name={crisis.title} key={index} value={crisis.id}>{crisis.title}</option>
                        })
                    }
                </select>
            </div>}
            <div className={'form__block'}>
                <label>Reaction score</label>
                <input
                    type={'number'}
                    value={formData.reaction_score}
                    placeholder={'Reaction Score'}
                    onChange={handleChange}
                    id={'reaction_score'}
                    name={'reaction_score'}
                />
            </div>
            <div className={'form__block'}>
                <label>Sharing score</label>
                <input
                    type={'number'}
                    value={formData.sharing_score}
                    placeholder={'Sharing Score'}
                    onChange={handleChange}
                    id={'sharing_score'}
                    name={'sharing_score'}
                />
            </div>
            <div className={'form__block'}>
                <label>Content score</label>
                <input
                    type={'number'}
                    value={formData.content_score}
                    placeholder={'Content Score'}
                    onChange={handleChange}
                    id={'content_score'}
                    name={'content_score'}
                />
            </div>
        </fieldset>
        <div className={'flex items-center'}>
            {response && <div className={'btn btn--success'}>Rapport created</div>}
            {/*{errors && <div className={'btn btn--error'}>{errors.errors[0]}</div>}*/}
            <button className={'btn btn--primary ml-auto mt-4'} onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    </form>
}


export default RapportForm
