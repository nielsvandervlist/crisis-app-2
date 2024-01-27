import Link from 'next/link'
import Dropdown from '@/components/Dropdown/Dropdown'

function NewCrisis() {
    return <Dropdown title={'Create your first crisis'}>
        <p className={'mb-4'}>Follow this step-by-step.</p>
        <h3><span className={'btn btn--round mb-4 mr-2'}>1</span> Create a new company</h3>
        <p className={'mb-4'}>Before you can create a crisis, you first have to create a company linked to the crisis.
            This can be anything you want and you can change the name anytime.</p>
        <Link href={'companies/create'} className={'btn btn--soft mb-8'}>Create a new company</Link>
        <h3><span className={'btn btn--round mb-4 mr-2'}>2</span> Create a new crisis</h3>
        <p className={'mb-4'}>Now you can create a crisis, this is empty for now</p>
        <Link href={'crisis/create'} className={'btn btn--soft mb-8'}>Create a new Crisis</Link>
        <h3><span className={'btn btn--round mb-4 mr-2'}>3</span> Create a post</h3>
        <p className={'mb-4'}>Posts can be shown on the participants view. Create any social media post you want.</p>
        <Link href={'posts/create'} className={'btn btn--soft mb-8'}>Create a new Post</Link>
        <h3><span className={'btn btn--round mb-4 mr-2'}>4</span> Create a participant</h3>
        <p className={'mb-4'}>Participants are linked to a crisis. These participants only see the posts linked to the
            crisis. We will get there in a second.</p>
        <Link href={'participants/create'} className={'btn btn--soft mb-8'}>Create a new Participant</Link>
        <h3><span className={'btn btn--round mb-4 mr-2'}>5</span> Create a timeline</h3>
        <p className={'mb-4'}>Timelines are used to show posts that you made on a specific time. When a crisis is active
            and has a timeline the posts show automatically.</p>
        <Link href={'timelines/create'} className={'btn btn--soft mb-8'}>Create a new Timeline</Link>
    </Dropdown>
}

export default NewCrisis
