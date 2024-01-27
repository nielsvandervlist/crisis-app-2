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
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        You're logged in!

                        <List items={items} setItems={setItems} type={'posts'}/>

                    </div>
                </div>
            </div>
        </div>
    )
}
