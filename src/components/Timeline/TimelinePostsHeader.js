import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function TimelinePostsHeader({title}){
    return <div className={'timeline-posts__header'}>
        <div className={'timeline-posts-date'}>
            {/*<span>{dateString[0]}</span>*/}
            {/*<span>{dateString[1]}</span>*/}
        </div>
        <h2>{title}</h2>
        <FontAwesomeIcon icon="ellipsis-vertical"/>
    </div>
}

export default TimelinePostsHeader
