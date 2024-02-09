'use client'
import {useGet} from '@/hooks/methods'
import { useAuthContext } from "@/components/Layouts/AuthContext"
import DashboardWrapper from "@/components/Dashboard/DashboardWrapper"

export default function Page() {

    const user = useAuthContext();
    const [crises, setCrises, isLoading] = useGet('/api/crises', {
        user_id: user?.id,
        status: 1,
        company: true,
        timeline: true,
    })

    const [documents, setDocuments, loading] = useGet('/api/documents', {
        user_id: user?.id,
        crisis_id: 1,
    })

    if(isLoading || loading){
        return <div>No active urges</div>
    }

    return (
        <div className={'col-span-12 grid grid-cols-12 gap-4 relative'}>
            <DashboardWrapper crises={crises} documents={documents}/>
        </div>
    )
}
