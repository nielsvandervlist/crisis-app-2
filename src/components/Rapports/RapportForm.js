import useAuth from '@/hooks/auth'
import {useEffect, useState} from 'react'
import {Fetcher} from 'ra-fetch'
import Link from 'next/link'

function RapportForm({requestType, id, rapport}) {
    const {user} = useAuth({middleware: 'auth'})

    const [title, setTitle] = useState(rapport ? rapport.data.title : '')
    const [description, setDescription] = useState(rapport ? rapport.data.description : '')
    const [reactionScore, setReactionScore] = useState(rapport ? rapport.data.reaction_score : 0)
    const [sharingScore, setSharingScore] = useState(rapport ? rapport.data.sharing_score : 0)
    const [contentScore, setContentScore] = useState(rapport ? rapport.data.content_score : 0)
    const [crises, setCrisis] = useState(rapport ? rapport.data.crisis_id : '')
    const [crisisId, setCrisisId] = useState()
    const [response, setResponse] = useState()
    const [errors, setErrors] = useState()

    useEffect(() => {
        Fetcher.api('backend').index('crises')
            .then((res) => {
                setCrisis(res)
            })
    }, [])

    if (!user || !crises) {
        return <></>
    }

    const params = {
        title: title,
        description: description,
        reaction_score: reactionScore,
        sharing_score: sharingScore,
        content_score: contentScore,
        crisis_id: crisisId,
    }

    if (id) {
        params.id = id
    }

    function submit(e) {
        e.preventDefault()

        if (requestType === 'store') {
            Fetcher.api('backend').store('rapports', params)
                .then(response => setResponse(response))
                .catch(errors => setErrors(errors))
        }

        if (requestType === 'update') {
            Fetcher.api('backend').update('rapports', params)
                .then(response => setResponse(response))
                .catch(errors => setErrors(errors))
        }
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
                    placeholder={'Email'}
                    onChange={event => setDescription(event.target.value)}
                    id={'description'}
                    name={'description'}
                />
            </div>
            {!crises.loading && <div className={'form__block'}>
                <label>Crisis</label>
                <select
                    value={crisisId}
                    onChange={event => setCrisisId(event.target.value)}
                >
                    <option>Select a option</option>
                    {
                        crises.data.map((crisis, index) => {
                            return <option key={index} value={crisis.id}>{crisis.title}</option>
                        })
                    }
                </select>
            </div>}
            <div className={'form__block'}>
                <label>Reaction score</label>
                <input
                    type={'number'}
                    value={reactionScore}
                    placeholder={'Reaction Score'}
                    onChange={event => setReactionScore(event.target.value)}
                    id={'reaction_score'}
                    name={'reaction_score'}
                />
            </div>
            <div className={'form__block'}>
                <label>Sharing score</label>
                <input
                    type={'number'}
                    value={sharingScore}
                    placeholder={'Sharing Score'}
                    onChange={event => setSharingScore(event.target.value)}
                    id={'sharing_score'}
                    name={'sharing_score'}
                />
            </div>
            <div className={'form__block'}>
                <label>Content score</label>
                <input
                    type={'number'}
                    value={contentScore}
                    placeholder={'Content Score'}
                    onChange={event => setContentScore(event.target.value)}
                    id={'content_score'}
                    name={'content_score'}
                />
            </div>
        </fieldset>
        <div className={'flex items-center'}>
            {response && <div className={'btn btn--success'}>Rapport created</div>}
            {errors && <div className={'btn btn--error'}>{errors.errors[0]}</div>}
            <button className={'btn btn--primary ml-auto mt-4'} onClick={(e) => submit(e)}>Submit</button>
        </div>
    </form>
}


export default RapportForm
