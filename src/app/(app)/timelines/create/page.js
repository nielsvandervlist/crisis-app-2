'use client'
import Timeline from '@/components/Timeline/Timeline'
import Link from 'next/link'
import BackButton from '@/components/BackButton'

const Create = () => {

    return (
        <>
            <div className={'col-span-12'}>
                <BackButton/>
            </div>
            <div className={'card col-span-4'}>
                <h3 className={'mb-4'}>Creating a timeline</h3>
                <p className={'mb-4'}>Before you create a timeline, make sure you have created a <Link
                    href={'/create/crisis'} className={'underline'}>crisis</Link></p>
                <p className={'mb-4'}>Timelines can be used for showing posts in your crisis simulation. You can specify specific posts and
                    the time the post is supposed to show.</p>
                <p>Dont worry you can also show posts while the crisis is running without using a timeline!</p>
            </div>

            <Timeline form={true}/>
        </>
    )
}

export default Create
