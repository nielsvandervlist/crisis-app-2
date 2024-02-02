import {useEffect, useRef, useState} from 'react'
import EditBox from '@/components/Timeline/EditBox'
import {useGet} from '@/hooks/methods'

function Line({setOpen, open, duration, timelinePosts, edit, setEdit, timeline}) {

    const [done, setDone] = useState()

    const [line, setLine] = useState({
        blocks: [],
        minutes: '',
        date: [],
        posts: [],
    })

    useEffect(() => {

        //For spots
        const minutes = duration * 60
        let timeBlock = []
        let placement = []

        timelinePosts.data.forEach((post) => {

            const minute = post.time
            const width = document.querySelector('#line').offsetWidth
            const postMinute = (width / minutes) * minute

            placement.push({
                id: post.id,
                pixels: Math.round(postMinute - 20),
                time: minute,
            })
        })

        const blocksTimes = minutes > 60 ? 20 : duration > 120 ? 30 : 5

        for (let i = 0; i <= minutes; i = i + blocksTimes) {
            timeBlock.push(i + ':00')
        }

        setLine({
            blocks: timeBlock,
            minutes: minutes,
            posts: placement,
        })
    }, [duration, timelinePosts])

    function createLine(time){
        const width = document.querySelector('#line').offsetWidth
        const duration = timeline.data.duration * 60
        const passedTime = time / 60
        const progress = (passedTime % duration / duration) * 100;
        setDone(width / 100 * progress)
    }

    useEffect(() => {
        if (timeline.data.online) {
            const interval = setInterval(() => {
                const [time, setTime, isLoading] = useGet(`/api/timelines/${timeline.data.id}`)
                if(!isLoading){
                    createLine(time.data.time)
                }
            }, 60 * 1000)

            return () => clearInterval(interval);
        }
    }, [timeline.data])

    function editPost(post) {
        setEdit(post)
    }

    return <div className={'timeline__line'}>
        <div className={'timeline-posts__wrapper'}>
            <div className={'timeline-posts__edit-wrapper relative'}>
                {
                    line.posts.map((post, index) => {
                        return <div className={'absolute'} onClick={() => editPost(post)} key={index}
                                    style={{left: post.pixels}}>
                            <EditBox
                                setOpen={setOpen}
                                open={open}
                                index={index}
                                post={post}
                                edit={edit}
                                setEdit={setEdit}
                            />
                        </div>
                    })
                }
            </div>
            <div className={'timeline-posts__line cursor-pointer'}
                 onClick={() => setOpen(true) && setEdit(false) && console.log('open')}>
                <div className={'timeline-posts-post timeline-posts-post__add'}/>
                <div className={'timeline-posts-done'}
                    style={{width: `${done}px`}}
                />
            </div>
            <div className={'timeline-posts-time flex justify-between'}>
                {
                    line.blocks.map((block, index) => {
                        return <div className={'relative'} key={index}>
                            <span>{block}</span>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}

export default Line
