import GetParticipants from '@/components/Participants/GetParticipants'
import {update} from '@/hooks/methods'
import { useEffect, useState } from "react"

function TimelinePostsFooter({company_id, timeline, setTimeline}) {

    const [response, setResponse] = useState()
    const [errors, setErrors] = useState()

    function submit(){
        update(`/api/timelines/${timeline.data.id}`, {
            online: timeline.data.online ? 0 : 1
        }, setResponse, setErrors)
    }

    useEffect(() => {
      if(response?.data){
        setTimeline({data: response.data})
      }
    }, [response])

    return <div className={'timeline-posts__footer'}>
        <div className={'timeline-posts-profiles'}>
            <GetParticipants company_id={company_id}/>
        </div>
        <div className={'timeline-posts-description'}>Text</div>
        <button className={'btn btn--primary mt-auto'} onClick={() => submit()}>{`${timeline.data.online ? 'Stop timeline' : 'Start timeline'}`}</button>
    </div>
}

export default TimelinePostsFooter
