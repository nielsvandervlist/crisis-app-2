import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faComment,
    faEllipsisVertical,
    faHeart,
    faShareAlt,
    faThumbsUp,
    faUsers
} from "@fortawesome/free-solid-svg-icons"

function Facebook({social}){

    return <div className={'facebook social'}>
        <div className={'facebook__header'}>
            <div className={'flex'}>
                <img className={'rounded-full w-8 h-8'} src={'/images/Portrait_Placeholder.png'} alt={''}/>
                <div className={'facebook__header__info'}>
                    <span>John Doe</span>
                    <span>5 mins . <FontAwesomeIcon icon={faUsers}/></span>
                </div>
            </div>
            <FontAwesomeIcon icon={faEllipsisVertical}/>
            <h3>{social.title}</h3>
            <p>{social.description}</p>
        </div>
        <img src={'/images/placeholder.png'} className={'w-full'} alt={''}/>
        <div className={'facebook__body'}>
            <div className={'facebook__likes'}>
                <FontAwesomeIcon icon={faHeart}/>
                <span> 15 people</span>
            </div>
            <div className={'facebook__comments'}>
                <div> <FontAwesomeIcon icon={faThumbsUp}/>Like</div>
                <div> <FontAwesomeIcon icon={faComment}/>Comment</div>
                <div><FontAwesomeIcon icon={faShareAlt}/>Share</div>
            </div>
            <div className={'facebook__add-comments'}>
                <img src={'/images/Portrait_Placeholder.png'} className={'w-8 h-8 rounded-full'} alt={''}/>
                <div className={'facebook__write flex'}>
                    <div>Comment</div>
                    <div className={'write-options flex'}>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Facebook
