import * as helpers from '@/helpers'
import {Fetcher} from 'ra-fetch'
import Link from 'next/link'
import {useEffect, useState} from 'react'

function TimelinePostsList({crisis, user}) {

    const [timelinePosts, setTimelinePosts] = useState()

    useEffect(() => {
        if(user?.id){
            Fetcher.api('backend').index('timeline_posts', {
                crisis_id: crisis.id,
                post: true,
            }).then(res => setTimelinePosts(res))
        }
    }, [])

    function replaceObjectValueInArray(arr, id, key, newValue) {
        return arr.map(obj => obj.id === id ? {...obj, [key]: newValue} : obj)
    }

    function changeStatus(id, online){
        Fetcher.api('backend').update('timeline_posts', {
            'id': id,
            'online': online ? 0 : 1
        }).then(res => {
            const obj = replaceObjectValueInArray(timelinePosts.data, id, 'online', online ? 0 : 1)
            setTimelinePosts({data: obj})
        })
    }

    if(!timelinePosts){
        return <></>
    }

    return <div className={'col-span-6 card card--np'}>
        <table className={'notifications-list'}>
            <thead>
            <tr className={'notifications-list__head'}>
                <td colSpan={3}><h2>Timeline Posts</h2></td>
            </tr>
            <tr className={'notifications-list__description'}>
                <th>title</th>
                <th>description</th>
                <th>Visible</th>
            </tr>
            </thead>
            <tbody>
            {
                timelinePosts.data.map((timelinepost, index) => {
                    return <tr
                        className={`posts-list__item`}
                        key={index}
                    >
                        <td className={'posts-list__header'}>
                            <h3>{timelinepost.post.title}</h3>
                        </td>
                        <td className={'mt-auto'}>{timelinepost.post.description}</td>
                        <td className={'mt-auto mb-auto text-center'}>
                            <span
                                className={`w-4 h-4 cursor-pointer rounded-full bg-${timelinepost.online ? 'success' : 'danger'} block`}
                                onClick={() => changeStatus(timelinepost.id, timelinepost.online)}
                            />
                        </td>
                    </tr>
                })
            }
            </tbody>
        </table>
    </div>
}

export default TimelinePostsList
