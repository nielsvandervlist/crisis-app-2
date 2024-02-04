'use client'
import List from '@/components/Lists/List'
import Link from 'next/link'
import {useAuthContext} from '@/components/Layouts/AuthContext'
import {useGet} from '@/hooks/methods'

const Rapports = () => {

    const {user} = useAuthContext()
    const [rapports, setRapports] = useGet('/api/rapports', {
        user_id: user?.id,
    })

    return (
        <>
            <div className={'flex w-full col-span-12 mb-2'}>
                <button className={'btn btn--primary'}><Link href={`rapports/create`}>Create rapport</Link></button>
            </div>
            {rapports && <List items={rapports} setItems={setRapports} type={'rapports'}/>}
        </>
    )
}

export default Rapports
