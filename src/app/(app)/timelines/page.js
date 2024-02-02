'use client'
import List from '@/components/Lists/List'
import Link from 'next/link'
import {useGet} from '@/hooks/methods'
import {useAuthContext} from '@/components/Layouts/AuthContext'

const Timelines = () => {

    const user = useAuthContext()
    const [timelines, setTimelines] = useGet('/api/timelines', {
        user_id: user?.id,
    })

    return (
        <>
            <div className={'flex w-full col-span-12 mb-2'}>
                <button className={'btn btn--primary'}><Link href={`timelines/create`}>Create timeline</Link></button>
            </div>
            {timelines && <List items={timelines} setItems={setTimelines} type={'timelines'}/>}
        </>
    )
}

export default Timelines
