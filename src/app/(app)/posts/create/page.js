'use client'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import PostForm from '@/components/Forms/PostForm'

function Create() {
    return (
        <>
            <div className={'col-span-6 card'}>
                <h3 className={'mb-4'}>Creating a new post</h3>
                <p>You can already make posts beforehand so you can use them later!</p>
            </div>

            <div className={'col-span-12 grid gap-4 grid-cols-12'}>
                <div className={'col-span-3 card card--social'}>
                    <FontAwesomeIcon icon="fa-brands fa-twitter"/>
                    <span>Twitter</span>
                </div>
                <div className={'col-span-3 card card--social'}>
                    <FontAwesomeIcon icon="fa-brands fa-facebook"/>
                    <span>Facebook</span>
                </div>
                <div className={'col-span-3 card card--social'}>
                    <FontAwesomeIcon icon="fa-brands fa-youtube"/>
                    <span>Youtube</span>
                </div>
                <div className={'col-span-3 card card--social'}>
                    <FontAwesomeIcon icon="fa-brands fa-linkedin"/>
                    <span>Linkedin</span>
                </div>
            </div>

            <PostForm requestType={'post'}/>
        </>
    )
}

export default Create
