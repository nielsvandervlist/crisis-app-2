'use client'

import {useGet} from '@/hooks/methods'
import PostForm from '@/components/Forms/PostForm'
import List from '@/components/Lists/List'
import useGetData from '@/hooks/useGetData'

export default function Page() {

    const { data, setData, isLoading, isError } = useGet('/api/posts');

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {isError.message}</div>;

    return (
        <div className={'col-span-12'}>
            {/*<List items={items} setItems={setItems} type={'posts'}/>*/}
        </div>
    )
}
