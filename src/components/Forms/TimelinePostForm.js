import {useEffect, useState} from 'react'
import {Fetcher, useApi, useIndex} from 'ra-fetch'
import useAuth from '@/hooks/auth'

function TimelinePostForm({timelineId, posts, timelinePosts, setTimelinePosts, setOpen, edit}) {

    const [time, setTime] = useState('')
    const [postId, setPostId] = useState('')
    const [response, setResponse] = useState()
    const [errors, setErrors] = useState()

    //Update posts on timeline
    function addTimelinePost(response) {
        let newTimelinePosts = timelinePosts.data.clone()
        newTimelinePosts.save(response)
        setTimelinePosts({data: newTimelinePosts})
        setOpen(false)
    }

    function removeTimelinePost(response, edit) {
        const filter = timelinePosts.data.filter((item) => item.id !== edit)
        setTimelinePosts({data: filter})
    }

    useEffect(() => {
        if (edit) {
            const filter = timelinePosts.data.filter((item) => item.id === edit)
            setTime(filter[0].time)
            setPostId(filter[0].post_id)
        }
    }, [edit])

    let params = {
        time: time,
        post_id: postId,
        timeline_id: timelineId,
        online: 0,
    }

    if (edit) {
        params.id = edit
    }

    function remove(e) {
        e.preventDefault()
        Fetcher.api('backend').delete('timeline_posts', {id: edit})
            .then(response => removeTimelinePost(response.data, edit))
            .catch(errors => setErrors(errors))

        setOpen(false)
    }

    function submit(e) {
        e.preventDefault()

        if (!edit) {
            Fetcher.api('backend').store('timeline_posts', params)
                .then(response => addTimelinePost(response.data))
                .catch(errors => setErrors(errors))
        } else {
            Fetcher.api('backend').update('timeline_posts', params)
                .then(response => addTimelinePost(response.data))
                .catch(errors => setErrors(errors))
        }
    }

    return <form className={'col-span-12 form'}>
        <fieldset>
            <div className={'form__block'}>
                <label>Time</label>
                <input
                    type={'number'}
                    value={time}
                    placeholder={'time'}
                    onChange={event => setTime(event.target.value)}
                    id={'time'}
                    name={'time'}
                />
            </div>
            {!posts.loading && <div className={'form__block'}>
                <label>Post</label>
                <select
                    value={postId}
                    onChange={event => setPostId(event.target.value)}
                >
                    <option>Select a option</option>
                    {
                        posts.data.map((post, index) => {
                            return <option key={index} value={post.id}>{post.title}</option>
                        })
                    }
                </select>
            </div>}
        </fieldset>
        <div className={'flex items-center'}>
            {response && <div className={'btn btn--success'}>Timeline created</div>}
            {/*{errors && <div className={'btn btn--error'}>{errors.errors[0]}</div>}*/}
            <div className={'ml-auto'}>
                <button className={'btn btn--primary mt-4'} onClick={submit}>{edit ? 'Edit' : 'Submit'}</button>
                {edit && <button className={'btn btn--warning mt-4 ml-4'} onClick={(e) => remove(e)}>Remove</button>}
            </div>
        </div>
    </form>
}

export default TimelinePostForm
