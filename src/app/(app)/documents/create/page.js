'use client'

import MultipleFileUpload from '@/components/Forms/MultipleFileUpload'
import {useState} from 'react'

const Create = () => {

    const [file, setFile] = useState()
    const {user} = useAuth({middleware: 'auth'})

    function sendFiles(files) {
        files.forEach(file => {
            Fetcher.api('backend').store('documents', {
                'name': file.name,
                'user_id': user.id,
                'url': file,
                'inserted': 0,
            })
        })
    }

    return (
        <>
            <div className={'col-span-12 card'}>
                <h1 className={'mb-4'}>Submit your documents</h1>
                <MultipleFileUpload
                    filesOnly={true}
                    file={file}
                    setFile={setFile}
                    label={'Add documents'}
                />

                <button onClick={() => sendFiles(file)} className={'btn btn--primary'}>Submit documents</button>
            </div>

        </>
    )
}

export default Create
