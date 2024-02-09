'use client'
import {useParams} from 'next/navigation'
import CrisisForm from '@/components/Forms/CrisisForm'
import { useGet } from "@/hooks/methods"
import { useAuthContext } from "@/components/Layouts/AuthContext"

const Crisis = () => {

    const user = useAuthContext();
    const params = useParams()
    const [crisis, setCrisis] = useGet(`/api/crises/${params.pid}`, {company: true})
    const [documents, setDocuments] = useGet(`/api/documents`, {crisis_id: params.pid})

    if(!crisis){
        return <></>
    }

    return (
        <>
            {crisis && <CrisisForm requestType={'update'} id={params.pid} crisis={crisis} documents={documents}/>}
        </>
    )
}

export default Crisis
