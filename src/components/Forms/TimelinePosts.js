import {useEffect, useRef, useState} from 'react'
import {Fetcher, useApi, useIndex} from 'ra-fetch'
import useAuth from '@/hooks/auth'
import Modal from '@/components/Modal/Modal'
import TimelinePostForm from '@/components/Forms/TimelinePostForm'
import Line from '@/components/Timeline/Line'
import GetParticipants from '@/components/Participants/GetParticipants'
import TimelinePostsHeader from '@/components/Timeline/TimelinePostsHeader'
import TimelinePostsFooter from '@/components/Timeline/TimelinePostsFooter'

function TimelinePosts({duration, title, timeline, setTimeline, participant}) {

    const {user} = useAuth({middleware: 'auth'})
    const [open, setOpen] = useState(false)
    const [posts, setPosts] = useState('')
    const [timelinePosts, setTimelinePosts] = useState([])
    const [edit, setEdit] = useState()

    useEffect(() => {
        if (user?.id) {
            Fetcher.api('backend').index('posts', {
                user_id: user?.id,
            }).then(res => setPosts(res))

            Fetcher.api('backend').index('timeline_posts', {
                timeline_id: timeline.data.id,
                post: true,
            }).then(res => setTimelinePosts(res))
                .catch(err => console.log(err))
        }
    }, [user?.id])

    useEffect(() => {
        if(!open){
            setEdit(false)
        }
    }, [open])

    if (timelinePosts.loading || timelinePosts.length < 1) {
        return <></>
    }

    return <div className={'card col-span-12 timeline-posts'}>
        <TimelinePostsHeader title={title}/>

        <div id={'line'} className={'w-full'}/>

        <Line
            setTimelinePosts={setTimelinePosts}
            timeline={timeline}
            timelinePosts={timelinePosts}
            setOpen={setOpen}
            duration={duration}
            open={open}
            edit={edit}
            setEdit={setEdit}
        />

        <TimelinePostsFooter timeline={timeline} setTimeline={setTimeline} company_id={timeline.data.company_id}/>

        <Modal title={'Add posts to timeline'} open={open} setOpen={setOpen}>
            <TimelinePostForm
                timelinePosts={timelinePosts}
                setTimelinePosts={setTimelinePosts}
                duration={duration}
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
