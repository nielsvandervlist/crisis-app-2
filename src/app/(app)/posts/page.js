import {useAuth} from '@/hooks/auth'
import List from '@/components/Lists/List'
import Link from 'next/link'
import useGetData from '@/hooks/useGetData'

const Posts = () => {

    const {user} = useAuth({middleware: 'auth'})
    const [posts, setPosts] = useGetData('/api/posts')

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
