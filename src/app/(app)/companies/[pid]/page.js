import Form from '@/components/Companies/Form'
import { useParams } from "next/navigation"
import { useAuthContext } from "@/components/Layouts/AuthContext"
import { useGet } from "@/hooks/methods"

const Crisis = () => {

    const user = useAuthContext();
    const params = useParams()
    const [company, setCompany] = useGet(`/api/companies/${params.pid}`)

    return (
        <>
            {company && <Form requestType={'update'} id={params.pid} company={company}/>}
        </>
    )
}

export default Crisis
