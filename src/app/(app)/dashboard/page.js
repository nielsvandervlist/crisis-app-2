'use client'

import {get} from '@/hooks/methods'
import PostForm from '@/components/Forms/PostForm'
import List from '@/components/Lists/List'
import useGetData from '@/hooks/useGetData'

export default function Page() {

    const [items, setItems] = useGetData('/api/posts')

    if(!items){
        return <></>
    }

    return (
        <div className={'col-span-12'}>
            You're logged in!
            <List items={items} setItems={setItems} type={'posts'}/>
        </div>
    )
}
