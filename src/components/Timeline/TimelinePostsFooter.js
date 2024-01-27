import GetParticipants from '@/components/Participants/GetParticipants'
import {useEffect} from 'react'
import useAuth from '@/hooks/auth'
import {Fetcher} from 'ra-fetch'

function TimelinePostsFooter({company_id, timeline, setTimeline}) {

    function submit(){
        Fetcher.api('backend').update('timelines', {
            id: timeline.data.id,
            online: timeline.data.online ? 0 : 1,
        }).then(res => setTimeline(res))
    }

    return <div className={'timeline-posts__footer'}>
        <div className={'timeline-posts-profiles'}>
            <GetParticipants company_id={company_id}/>
        </div>
        <div className={'timeline-posts-description'}>Text</div>
        <button className={'btn btn--primary'} onClick={() => submit()}>{`${timeline.data.online ? 'Stop timeline' : 'Start timeline'}`}</button>
    </div>
}

export default TimelinePostsFooter
