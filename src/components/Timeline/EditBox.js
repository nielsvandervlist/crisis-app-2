import {useEffect, useState} from 'react'
import Modal from '@/components/Modal/Modal'
import {useApi, useShow} from 'ra-fetch'
import TimelinePostForm from '@/components/Forms/TimelinePostForm'

function EditBox({post, setOpen, open, setEdit}) {

    useEffect(() => {
        if(open)
        setEdit(post.post_id)
    }, [])

    return <>
        <div
            className={'timeline-posts-post timeline-posts-post__edit cursor-pointer'}
            onClick={() => setOpen(!open)}
        />
    </>
}

export default EditBox
