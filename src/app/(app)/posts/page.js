import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import useAuth from '@/hooks/auth'
import {useEffect, useState} from 'react'
import {Fetcher} from 'ra-fetch'
import List from '@/components/Lists/List'
import Link from 'next/link'

const Posts = () => {

    const {user} = useAuth({middleware: 'auth'})
    const [posts, setPosts] = useState()

    useEffect(() => {
        if (user?.id) {
            Fetcher.api('backend')
                .index('posts', {
                    user_id: user?.id,
                })
                .then(response => setPosts(response))
        }
    }, [user?.id])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>

            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            <div className={'flex w-full col-span-12 mb-2'}>
                <button className={'btn btn--primary'}><Link href={`posts/create`}>Create post</Link></button>
            </div>

            {posts && <List items={posts} setItems={setPosts} type={'posts'}/>}

        </AppLayout>
    )
}

export default Posts
