import {Fetcher} from 'ra-fetch'
import {useEffect, useState} from 'react'
import useAuth from '@/hooks/auth'
import DragAndDrop from '@/components/Forms/DragDrop'

function FileDrop({documents, id}){

    const {user} = useAuth({middleware: 'auth'})
    const [rounds, setRounds] = useState()

    //TODO Rounds is not yet used
    useEffect(() => {
            if (user?.id)
                Fetcher.api('backend')
                    .index('rounds', {
                        crisis_id: id,
                    }).then(response => setRounds(response))
        }, [user?.id],
    )

    return <div>
        {rounds && <DragAndDrop data={documents.data} rounds={rounds}/>}
    </div>
}

export default FileDrop
