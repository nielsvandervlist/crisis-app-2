import {useEffect, useRef, useState} from 'react'
import EditBox from '@/components/Timeline/EditBox'
import {Fetcher} from 'ra-fetch'

function ParticipantLine({duration, timeline}) {

    const [done, setDone] = useState()

    const [line, setLine] = useState({
        blocks: [],
        minutes: '',
    })

    useEffect(() => {
        //For spots
        const minutes = duration * 60
        let timeBlock = []

        const blocksTimes = minutes > 60 ? 20 : duration > 120 ? 30 : 5

        for (let i = 0; i <= minutes; i = i + blocksTimes) {
            timeBlock.push(i + ':00')
        }

        setLine({
            blocks: timeBlock,
            minutes: minutes,
        })
    }, [duration])

    function createLine(time){
        const width = document.querySelector('#line').offsetWidth
        const widthDone = (width / 100) * time
        setDone(widthDone)
    }

    useEffect(() => {
        if (timeline.data.online) {
            const interval = setInterval(() => {
                Fetcher.api('backend').show('timelines', {
                    id: timeline.data.id,
                }).then(res => createLine(res.data.time))
            }, 60 * 1000)

            return () => clearInterval(interval);
        }
    }, [timeline.data])

    function editPost(id) {
        setEdit(id)
    }

    return <div className={'timeline__line'}>
        <div className={'timeline-posts__wrapper'}>
            <div className={'timeline-posts__line'}>
                <div className={'timeline-posts-done'}
                    style={{width: `${done}px`}}
                />
            </div>
            <div className={'timeline-posts-time flex justify-between'}>
                {
                    line.blocks.map((block, index) => {
                        return <span key={index}>{block}</span>
                    })
                }
            </div>
        </div>
    </div>
}

export default ParticipantLine
