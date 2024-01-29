'use client'
import {useParams} from 'next/navigation'
import CrisisForm from '@/components/Forms/CrisisForm'
import useGetData from '@/hooks/useGetData'

const Crisis = () => {

    const params = useParams()
    const [crisis, setCrisis] = useGetData(`/api/crises/${params.pid}`, {company: true})
    const [documents, setDocuments] = useGetData(`/api/documents`, {crisis_id: params.pid})

    return (
        <>
            {crisis && <CrisisForm requestType={'update'} id={pid} crisis={crisis} documents={documents}/>}
        </>
    )
}

export default Crisis
