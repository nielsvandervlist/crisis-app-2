import {useState} from 'react'
import {update} from '@/hooks/methods'

function StartCrisis({crises, setActiveCrisis}){

    const [crisis, setCrisis] = useState()

    function submit() {
        update(`/api/crises/${crisis}`, {
            status: 1,
        }).then(response => setActiveCrisis(response))
    }

    return <div className={'card col-span-4 flex flex-col'}>
        <h3 className={'mb-4'}>Select a crisis to start and run the timeline</h3>
        {
            crises.data.length > 0 ?
            <div className={'form__block'}>
                <select
                    value={crisis}
                    onChange={event => setCrisis(event.target.value)}
                >
                    <option>Select a crisis</option>
                    {
                        crises.data.map((crisis, index) => {
                            return <option key={index} value={crisis.id}>{crisis.title}</option>
                        })
                    }
                </select>
            </div> : <p className={'block'}>You dont have any crises created yet, first create a new crisis to start one.</p>
        }
        <button onClick={submit} className={'mt-auto btn btn--success'}>Start crisis</button>
    </div>
}

export default StartCrisis
