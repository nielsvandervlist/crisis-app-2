'use client'
import Link from 'next/link'
import DownloadList from '@/components/Lists/DownloadList'
import {useAuthContext} from '@/components/Layouts/AuthContext'

const Documents = () => {

    const {user} = useAuthContext()
    const [documents, setDocuments] = useGet('/api/documents', {
        'user_id': user?.id,
    })

    return (
        <>
            <div className={'flex w-full col-span-12 mb-2'}>
                <button className={'btn btn--primary'}><Link href={`documents/create`}>Create document</Link></button>
            </div>
            {documents && <DownloadList items={documents} setItems={setDocuments} type={'documents'}/>}
        </>
    )
}

export default Documents
