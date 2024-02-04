'use client'
import Info from '@/components/Rapports/Info'
import {useAuthContext} from '@/components/Layouts/AuthContext'
import {useParams} from 'next/navigation'
import {useGet} from '@/hooks/methods'

const Report = () => {

    const {user} = useAuthContext()
    const params = useParams()
    const [rapport, setRapport] = useGet(`/api/rapports/${params.pid}`, {
        info: true,
    })

    if(!rapport){
        return <></>
    }

    return (
            <div className={'card col-span-12'}>
                <Info rapport={rapport}/>
            </div>
    )
}

export default Report
