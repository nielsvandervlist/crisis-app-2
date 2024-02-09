import {useState} from 'react'
import {useAuth} from '@/hooks/auth'
import Modal from '@/components/Modal/Modal'
import ParticipantForm from '@/components/Participants/ParticipantForm'
import { useGet } from "@/hooks/methods"

function GetParticipants({company_id, alignRight, info, participant}) {

    const {user} = useAuth({middleware: 'auth'})
    const [participants, setParticipants] = useGet('/api/participants', {
        company_id: company_id,
        user_id: participant ? participant.user_id : user?.id,
    })

    const [open, setOpen] = useState(false)

    return <div className={'participants'}>
        <div className={'flex mb-8'}>
        {
            participants && participants.data &&
            participants.data.map((participant, index) => {
                return <div key={index} className={'flex flex-col items-center justify-center participants__block'}>
                    <figure
                        className={`rounded-full h-10 w-10 relative overflow-hidden ${alignRight ? 'flex-row-reverse' : ''}`}>
                        <img src={'/images/Portrait_Placeholder.png'} alt={''} title={participant.name}/>
                    </figure>
                    <div className={'btn btn--label-small'}>{participant.name}</div>
                </div>
            })
        }
        </div>
        <div>
            <span className={'btn btn--soft cursor-pointer'} onClick={() => setOpen(!open)}>Add new participant</span>
            <Modal open={open} setOpen={setOpen} title={'Add participants'}>
                <ParticipantForm requestType={'post'}/>
            </Modal>
        </div>
    </div>
}

export default GetParticipants
