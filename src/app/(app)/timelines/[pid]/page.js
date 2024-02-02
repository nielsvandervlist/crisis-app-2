'use client'
import Timeline from '@/components/Timeline/Timeline'
import Link from 'next/link'
import {useParams} from 'next/navigation'
import {useGet} from '@/hooks/methods'

const TimelineEdit = () => {

    const params = useParams()
    const [timeline, setTimeline, isLoading] = useGet(`/api/timelines/${params.pid}`)

    if(isLoading){
        return <></>
    }

    return (
        <>
            <div className={'card col-span-4'}>
                <h3 className={'mb-4'}>Edit {timeline.data.title}</h3>
                <p className={'mb-4'}>Before you create a timeline, make sure you have created a <Link
                    href={'/create/crisis'} className={'underline'}>crisis</Link></p>
                <p className={'mb-4'}>Timelines can be used for showing posts in your crisis simulation. You can specify
                    specific posts and
                    the time the post is supposed to show.</p>
                <p>Dont worry you can also show posts while the crisis is running without using a timeline!</p>
            </div>
            {timeline && <Timeline form timeline={timeline} setTimeline={setTimeline}/>}
        </>
    )
}

export default TimelineEdit
