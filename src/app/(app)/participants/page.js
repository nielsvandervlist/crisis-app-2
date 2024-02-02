'use client'
import List from '@/components/Lists/List'
import Link from 'next/link'
import {useAuthContext} from '@/components/Layouts/AuthContext'
import {useGet} from '@/hooks/methods'

const Participants = () => {

    const [participants, setParticipants] = useGet('/api/participants')
    const user = useAuthContext()

    return (
        <>
            <div className={'card col-span-4 flex flex-col'}>
                <h3 className={'mb-4'}>Ont this page you can view your participants</h3>
                <p className={'mb-8'}>Or you can create a new one! Also you can edit or delete your participants easily
                    from here.</p>
                <button className={'btn btn--primary'}><Link href={`participants/create`}>Create participant</Link>
                </button>
            </div>
            {participants && <List items={participants} setItems={setParticipants} type={'participants'}/>}
        </>
    )
}

export default Participants
