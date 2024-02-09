'use client'
import { useParams } from 'next/navigation'
import PostForm from '@/components/Forms/PostForm'
import {useGet} from '@/hooks/methods'

const Post = () => {

    const params = useParams()
    const { post, isLoading, isError } = useGet('/api/posts');

    if(!post){
        return <></>
    }

    return (
        <>
            <div className={'card col-span-12'}>
                {post && <h1>Edit {post.data.title}</h1>}
            </div>
            <PostForm requestType={'update'} id={params.pid} post={post}/>
        </>
    )
}

export default Post
