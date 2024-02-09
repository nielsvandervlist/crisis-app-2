import {useEffect, useRef, useState} from 'react'
import Modal from '@/components/Modal/Modal'
import TimelinePostForm from '@/components/Forms/TimelinePostForm'
import Line from '@/components/Timeline/Line'
import GetParticipants from '@/components/Participants/GetParticipants'
import TimelinePostsHeader from '@/components/Timeline/TimelinePostsHeader'
import TimelinePostsFooter from '@/components/Timeline/TimelinePostsFooter'
import {useAuthContext} from '@/components/Layouts/AuthContext'
import {useGet} from '@/hooks/methods'

function TimelinePosts({timeline, setTimeline, participant}) {

    const user = useAuthContext();
    const [open, setOpen] = useState(false)
    const [posts, setPosts] = useGet('/api/posts', {
        user_id: user?.id
    })

    const [timelinePosts, setTimelinePosts, isLoading] = useGet('/api/timeline_posts', {
        timeline_id: timeline.data.id,
        post: true
    })

    const [edit, setEdit] = useState()

    useEffect(() => {
        if(!open){
            setEdit(false)
        }
    }, [open])

    if(isLoading){
        return <></>
    }

    return <div className={'card col-span-12 timeline-posts'}>
        <TimelinePostsHeader title={timeline.data.title}/>

        <div id={'line'} className={'w-full'}/>

        <Line
            duration={timeline.data.duration}
            setTimelinePosts={setTimelinePosts}
            timeline={timeline}
            timelinePosts={timelinePosts}
            open={open}
            setOpen={setOpen}
            edit={edit}
            setEdit={setEdit}
        />

        <TimelinePostsFooter timeline={timeline} setTimeline={setTimeline} company_id={timeline.data.company_id}/>

        <Modal title={'Add posts to timeline'} open={open} setOpen={setOpen}>
            <TimelinePostForm
                timelinePosts={timelinePosts}
                setTimelinePosts={setTimelinePosts}
                duration={timeline.data.duration}
                posts={posts}
                user={user}
                timelineId={timeline.data.id}
                setPosts={setPosts}
                setOpen={setOpen}
                edit={edit}
            />
        </Modal>
    </div>
}

export default TimelinePosts
