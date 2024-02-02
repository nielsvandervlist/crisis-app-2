'use client'
import {useParams} from 'next/navigation'
import ParticipantForm from '@/components/Participants/ParticipantForm'
import {useGet} from '@/hooks/methods'
import Link from 'next/link'

function Edit() {

    const params = useParams()
    const [participant, setParticipant, isLoading] = useGet(`/api/participants/${params.pid}`)

    if(isLoading){
        return <></>
    }

    return (
        <>
            <div className={'card col-span-4 flex flex-col'}>
                <h3 className={'mb-4'}>Edit {participant.data.name}</h3>
                <p className={'mb-8'}>Or you can create a <Link className={'underline'} href={`participants/create`}>new</Link> one! Also you can edit or delete your participants easily
                    from here.</p>
            </div>
            <ParticipantForm id={params.pid} participant={participant} requestType={'update'}/>
        </>
    )
}

export default Edit
