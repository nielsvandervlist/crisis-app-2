import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import useAuth from '@/hooks/auth'
import {useEffect, useState} from 'react'
import {Fetcher} from 'ra-fetch'
import List from '@/components/Lists/List'
import CreateCrisis from '@/components/Crisis/CreateCrisis'
import OnlineCrisis from '@/components/Crisis/OnlineCrisis'
import StartCrisis from '@/components/Crisis/StartCrisis'

const Crises = () => {

    const {user} = useAuth({middleware: 'auth'})
    const [crises, setCrises] = useState()
    const [activeCrisis, setActiveCrisis] = useState()

    useEffect(() => {
        if (user?.id) {
            Fetcher.api('backend')
                .index('crises', {
                    user_id: user?.id,
                    online: 1,
                })
                .then((res) => setCrises(res))
        }
    }, [user?.id])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>

            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            {
                crises && <>
                    <StartCrisis crises={crises} setActiveCrisis={setActiveCrisis}/>
                    <CreateCrisis/>
                    <OnlineCrisis crises={crises} activeCrisis={activeCrisis} setActiveCrisis={setActiveCrisis}/>
                </>
            }

            {crises && <List items={crises} setItems={setCrises} type={'crises'}/>}

        </AppLayout>
    )
}

export default Crises
