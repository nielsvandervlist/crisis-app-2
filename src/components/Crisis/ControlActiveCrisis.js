import useAuth from '@/hooks/auth'
import {useEffect, useState} from 'react'
import {Fetcher} from 'ra-fetch'
import GetParticipants from '@/components/Participants/GetParticipants'
import FileUpload from '@/components/Forms/FileUpload'
import MultipleFileUpload from '@/components/Forms/MultipleFileUpload'
import Timeline from '@/components/Timeline/Timeline'
import DragAndDrop from '@/components/Forms/DragDrop'
import FileDrop from '@/components/Rounds/FileDrop'
import Participants from '@/pages/participants'

function ControlActiveCrisis({crisis, documents}) {

    const {user} = useAuth({middleware: 'auth'})
    const [document, setDocument] = useState()
    const [response, setResponse] = useState()
    const [errors, setErrors] = useState()

    function setRoundOfDocument(id, value) {
        setDocument(value)

        Fetcher.api('backend').update('documents', {
            id: id,
            round_id: value,
        })
            .then(response => setResponse(response))
            .catch(errors => setErrors(errors))
    }

    return <>
        <div className={'card col-span-6'}>
            <div className={'active-crisis'}>
                <div className={'active-crisis__heading mb-4'}>
                    <h1 className={'mb-2'}>{crisis.title}</h1>
                    <p className={'font-bold'}>Description:</p>
                    <p className={'mb-2'}>{crisis.description}</p>
                    <p className={'font-bold'}>Company:</p>
                    <p>{crisis.company.name}</p>
                </div>
            </div>
        </div>
        <div className={'card col-span-12'}>
            {documents && <div className={'documents'}>
                <div className={'documents__heading mb-4'}>
                    <h3>Documents</h3>
                    <p>Choose in which round the documents are shown to the participants.</p>
                    <p>You can drag files from one box the the other.</p>
                </div>
                {documents && <FileDrop documents={documents} />}
            </div>}
        </div>

        <div className={'card col-span-12'}>
            <h3>Participants</h3>
            <p className={'mb-4'}>You can see all participants here</p>
            <div className={'border rounded-md border-gray-100 p-4 flex-1 relative'}>
                <GetParticipants company_id={crisis.company_id}/>
            </div>
        </div>
    </>
}

export default ControlActiveCrisis
