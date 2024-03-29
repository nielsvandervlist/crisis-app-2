import {useEffect, useState} from 'react'
import {del} from '@/hooks/methods'
import {useHandle} from '@/hooks/useHandle'

function TimelinePostForm({timelineId, posts, timelinePosts, setTimelinePosts, setOpen, edit}) {

    const url = edit ? `/api/timeline_posts/${edit.id}` : '/api/timeline_posts'
    const [test, setTest] = useState()
    const requestType = edit ? 'update' : 'post'
    const fieldsArray = ['time', 'post_id', 'post_type_id', 'online', 'thumbnail']
    const params = {
        online: 0,
        timeline_id: timelineId,
    }

    let {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        response,
        errors
    } = useHandle(fieldsArray, url, requestType, params, edit)

    let { time, post_id } = formData

    useEffect(() => {
        if (edit) {
            setFormData({...edit})
        }
    }, [setFormData])

    function addTimelinePost(response) {
        let newTimelinePosts = [...timelinePosts.data]
        newTimelinePosts.push(response)
        setTimelinePosts({ data: newTimelinePosts })
        setOpen(false)
    }

    useEffect(() => {
        if(response?.data){
            addTimelinePost(response.data)
        }
    }, [response])

    function removeTimelinePost(response, edit) {
        const filter = timelinePosts.data.filter((item) => item.id !== edit.id)
        setTimelinePosts({data: filter})
    }

    function remove(e) {
        e.preventDefault()
        del(`/api/timeline_posts/${edit.id}`, setTest)
            .then(response => removeTimelinePost(response.data, edit))
        setOpen(false)
    }

    return <form className={'col-span-12 form'}>
        <fieldset>
            <div className={'form__block'}>
                <label>Time</label>
                <input
                    type={'number'}
                    value={formData.time}
                    placeholder={'time'}
                    onChange={handleChange}
                    id={'time'}
                    name={'time'}
                />
            </div>
            {!posts.loading && <div className={'form__block'}>
                <label>Post</label>
                <select
                    value={formData.post_id}
                    onChange={handleChange}
                    name={'post_id'}
                >
                    <option>Select a option</option>
                    {
                        posts.data.map((post, index) => {
                            return <option name={post.title} key={index} value={post.id}>{post.title}</option>
                        })
                    }
                </select>
            </div>}
        </fieldset>
        <div className={'flex items-center'}>
            {response && <div className={'btn btn--success'}>Timeline created</div>}
            {/*{errors && <div className={'btn btn--error'}>{errors.errors[0]}</div>}*/}
            <div className={'ml-auto'}>
                <button className={'btn btn--primary mt-4'} onClick={e => handleSubmit(e)}>{edit ? 'Edit' : 'Submit'}</button>
                {edit && <button className={'btn btn--warning mt-4 ml-4'} onClick={(e) => remove(e)}>Remove</button>}
            </div>
        </div>
    </form>
}

export default TimelinePostForm
