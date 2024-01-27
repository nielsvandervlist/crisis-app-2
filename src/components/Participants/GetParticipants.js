import {useEffect, useState} from 'react'
import useAuth from '@/hooks/auth'
import {Fetcher} from 'ra-fetch'

function GetParticipants({company_id, alignRight, info, participant}) {

    const {user} = useAuth({middleware: 'auth'})
    const [participants, setParticipants] = useState()

    useEffect(() => {
        if (user?.id) {
            Fetcher.api('backend').index('participants', {
                user_id: participant ? participant.user_id : user?.id,
                company_id: company_id,
            }).then(res => setParticipants(res))
        }
    }, [user?.id])

    if (!participants || !participants.data.length || participants.loading) {
        return <></>
    }

    return <div className={'participants flex'}>
        {
            participants.data.map((participant, index) => {

                return <div key={index} className={'flex flex-col items-center justify-center participants__block'}>
                    <figure className={`rounded-full h-10 w-10 relative overflow-hidden ${alignRight ? 'flex-row-reverse' : ''}`}>
                        <img src={'/images/Portrait_Placeholder.png'} alt={''} title={participant.name}/>
                    </figure>
                    <div className={'btn btn--label-small'}>{participant.name}</div>
                </div>
            })
        }
    </div>
}

export default GetParticipants
