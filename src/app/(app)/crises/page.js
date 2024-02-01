'use client'
import {useEffect, useState} from 'react'
import List from '@/components/Lists/List'
import CreateCrisis from '@/components/Crisis/CreateCrisis'
import OnlineCrisis from '@/components/Crisis/OnlineCrisis'
import StartCrisis from '@/components/Crisis/StartCrisis'
import {useGet} from '@/hooks/methods'
import {useAuthContext} from '@/components/Layouts/AuthContext'

const Crises = () => {

    const [activeCrisis, setActiveCrisis] = useState()
    const user = useAuthContext()

    const [crises, setCrises, isLoading, isError] = useGet('/api/crises', {
        'user_id': user?.id,
    })

    if(isLoading){
        return <div>No active crises</div>
    }

    return (
        <>

            {
                crises && <>
                    <StartCrisis crises={crises} setActiveCrisis={setActiveCrisis}/>
                    <CreateCrisis/>
                    <OnlineCrisis crises={crises} activeCrisis={activeCrisis} setActiveCrisis={setActiveCrisis}/>
                </>
            }

            {crises && <List items={crises} setItems={setCrises} type={'crises'}/>}

        </>
    )
}

export default Crises
