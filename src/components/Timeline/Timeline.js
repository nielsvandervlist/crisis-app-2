import TimelineForm from '@/components/Forms/TimelineForm'
import TimelinePosts from '@/components/Forms/TimelinePosts'

function Timeline({timeline, setTimeline, form}) {

    return <>
        {form &&
            <TimelineForm
                timeline={timeline}
                requestType={timeline ? 'update' : 'post'}
            />
        }
        {
            timeline && timeline.data.id &&
            <TimelinePosts
                timeline={timeline}
                setTimeline={setTimeline}
            />
        }
    </>
}

export default Timeline
