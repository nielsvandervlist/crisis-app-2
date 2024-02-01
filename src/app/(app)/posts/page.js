'use client'
import List from '@/components/Lists/List'
import Link from 'next/link'
import {useGet} from '@/hooks/methods'

const Posts = () => {

    const [posts, setPosts] = useGet('/api/posts')

    return (
        <>
            <div className={'flex w-full col-span-12 mb-2'}>
                <button className={'btn btn--primary'}><Link href={`posts/create`}>Create post</Link></button>
            </div>
            {posts && <List items={posts} setItems={setPosts} type={'posts'}/>}
        </>
    )
}

export default Posts
