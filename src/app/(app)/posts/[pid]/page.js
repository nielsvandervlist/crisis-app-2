'use client'
import { useParams } from 'next/navigation'
import PostForm from '@/components/Forms/PostForm'
import useGetData from '@/hooks/useGetData'

const Post = () => {

    const params = useParams()
    const [post, setPost] = useGetData(`/api/posts/${params.pid}`, )

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
