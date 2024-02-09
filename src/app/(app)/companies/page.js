'use client'
import List from '@/components/Lists/List'
import Link from 'next/link'
import { useGet } from "@/hooks/methods"
import { useAuthContext } from "@/components/Layouts/AuthContext"

const Companies = () => {

    const user = useAuthContext();
    const [companies, setCompanies] = useGet('/api/companies', {
      user_id: user?.id
    })

    return (
        <>
            <div className={'flex w-full col-span-12 mb-2'}>
                <button className={'btn btn--primary'}><Link href={`companies/create`}>Create company</Link></button>
            </div>
            {companies && <List items={companies} setItems={setCompanies} type={'companies'}/>}
        </>
    )
}

export default Companies
