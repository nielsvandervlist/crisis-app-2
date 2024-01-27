import Facebook from '@/components/PostTypes/Facebook'
import Twitter from '@/components/PostTypes/Twitter'
import Youtube from '@/components/PostTypes/Youtube'
import {useEffect, useState} from 'react'
import {Fetcher} from 'ra-fetch'

export default function PostWrapper({setOpen, post}) {

    const [postTypes, setPostTypes] = useState()
    const [social, setSocial] = useState()

    useEffect(() => {
        Fetcher.api('backend')
            .index('post_types')
            .then(response => setPostTypes(response))
    }, [])

    useEffect(() => {
        if(postTypes) {
            postTypes.data.forEach((type) => {
                return post.post_type_id === type.id ? setSocial({...post, type: type.name}) : true
            })
        }
    }, [postTypes])

    function type(social){
        switch(social.type){
            case 'facebook':
                return <Facebook social={social}/>
            case 'twitter':
                return <Twitter social={social}/>
            case 'youtube':
                return <></>
        }
    }

    if (!postTypes || !social) {
        return <></>
    }

    return <div className={'post-wrapper'} onClick={() => setOpen(true)}>
        {
            type(social)
        }
    </div>
}
