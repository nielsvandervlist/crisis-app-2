import {useState} from 'react'
import {Fetcher} from 'ra-fetch'

function ChooseCrisis({crises, crisisId, setCrisisId}) {
    return <>
        {
            !crises.loading &&
            <div className={'form__block'}>
                <label>Select crisis</label>
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
            </div>
        }
    </>
}

function OnlineCrisis({crisis}) {

    function submit(e) {
        e.preventDefault()
        Fetcher.api('backend').update('crises', {
            id: crisis.id,
            status: 0,
        })
            .then(response => console.log(response))
            .catch(errors => console.log(errors))
    }

    return <div className={'flex'}>
        <div>
            <h2><span className={'bg-danger h-4 w-4 inline-block rounded-full mr-2'}/>{crisis.title}</h2>
            <p>{crisis.company.name}</p>
        </div>
        <button onClick={submit} className={'btn btn--primary ml-auto'}>Stop crisis</button>
    </div>
}

function RunCrisis({crises}) {

    if (!crises.data.length || crises.loading) {
        return <></>
    }

    const [crisisId, setCrisisId] = useState()

    return <div className={'create-crisis card col-span-6'}>
        {
            crises.data.length > 0
                ? <OnlineCrisis crisis={crises.data[0]}/>
                : <ChooseCrisis crises={crises} crisisId={crisisId} setCrisisId={setCrisisId}/>
        }
    </div>
}

export default RunCrisis
