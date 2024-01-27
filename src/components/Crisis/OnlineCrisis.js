import {useEffect, useState} from 'react'
import {Fetcher} from 'ra-fetch'
import Link from 'next/link'

function OnlineCrisis({crises, activeCrisis}) {

    const [onlineCrisis, setOnlineCrisis] = useState()

    useEffect(() => {
        const filter = crises.data.filter(crises => crises.status === 1)
        if(activeCrisis){
            setOnlineCrisis([activeCrisis.data, ...filter])
        } else {
            setOnlineCrisis(filter)
        }
    }, [activeCrisis])

    function stopCrisis(id){
        Fetcher.api('backend').update('crises', {
            id: id,
            status: 0
        })
    }

    return <div className={'col-span-4 card flex flex-col'}>
        <h3 className={'mb-4'}>Online crises</h3>
        <p className={'mb-4'}>Here is a list of all the active crises</p>
        {
            onlineCrisis ?
            onlineCrisis.map((crisis, index) => {
                return <div className={'border-t border-b border-gray-100 py-2'} key={index}>
                    <b className={'flex items-center'}>
                        <span className={'h-4 w-4 bg-success rounded-full inline-block mr-2'}/>
                        <Link href={`/crises/online/${crisis.id}`}>{crisis.title}</Link>
                        <span className={'ml-auto btn btn--primary btn--label'} onClick={() => stopCrisis(crisis.id)}>Stop crisis</span>
                    </b>
                </div>
            }) : <p className={'bg-info'}>You dont have any active crises yet</p>
        }
    </div>
}

export default OnlineCrisis
