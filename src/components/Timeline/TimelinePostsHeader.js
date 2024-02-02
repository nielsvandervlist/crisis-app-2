import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'

function TimelinePostsHeader({title}){
    return <div className={'timeline-posts__header'}>
        <div className={'timeline-posts-date'}>
            {/*<span>{dateString[0]}</span>*/}
            {/*<span>{dateString[1]}</span>*/}
        </div>
        <h2>{title}</h2>
        <FontAwesomeIcon icon={faEllipsisVertical}/>
    </div>
}

export default TimelinePostsHeader
