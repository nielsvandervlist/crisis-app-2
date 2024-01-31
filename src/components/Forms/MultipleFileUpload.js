import {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {del, store} from '@/hooks/methods'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'

//TODO remove duplicates is not working
function MultipleFileUpload({file, setFile, response, label, documents, filesOnly}) {

    const [preview, setPreview] = useState()
    const [filePreview, setFilePreview] = useState([])
    const [error, setError] = useState()

    function sendFiles(files, response) {
        files.forEach(file => {
            store('/api/documents', {
                'name': file.name,
                'crisis_id': response.data.id,
                'user_id': user?.id,
                'url': file,
                'inserted': 0,
            }).then(r => console.log(r))
        })
    }

    useEffect(() => {
        if (response && file) {
            sendFiles(file, response)
        }
    }, [response])

    useEffect(() => {
        if(documents){
            let arr = [];
            documents.data.forEach(item => {
                arr.push(item)
            })

            setFilePreview(arr)
        }
    },[])

    function isFileImage(file) {
        return file && file['type'].split('/')[0] === 'image'
    }

    function removeDuplicates(file, event) {
        return [...new Set(file), event.target.files[0]]
    }

    function removeDocument(name, id) {
        const filter = filePreview.filter(item => item.name !== name)
        setFilePreview(filter)

        if(!id){
            return false
        }

        del(`/api/documents/${id}`, {}).then(r => console.log(r))

    }


    useEffect(() => {
        let files = [...filePreview]

        if(file) {
            Array.from(file).forEach(item => {
                files.push({name: item.name})
                // if(isFileImage && filesOnly){
                //     setError('You can only upload files, images are not allowed')
                //     return false
                // }
                if (item && typeof item !== 'string' && isFileImage(item) && !filesOnly) {
                    setPreview(URL.createObjectURL(item))
                }
                if (item && typeof item !== 'string' && !isFileImage(item)) {
                    setFilePreview(files)
                } else {
                    setFilePreview([file])
                }
            })
        }
    }, [file])

    return <div className={`file-upload ${preview ? 'file-upload--preview' : ''}`}>

        {error && <div className={'btn btn--form-error my-4'}>{error}</div>}
        {
            preview &&
            <div className={'file-upload__preview'}>
                <img src={preview}/>
            </div>
        }
        {
            filePreview &&
            <div className={'file-upload__file-preview mb-8'}>
                <ul>
                    {
                        filePreview.map((file, index) => {
                            return <li key={index} className={'flex items-center'}>
                                {file.name ? file.name : file[0].name ? file[0].name : 'No name found'}
                                <span
                                    className={'pl-6 ml-auto text-primarysoft cursor-pointer'}
                                    onClick={() => removeDocument(file.name, file.id)}
                                >
                                    <FontAwesomeIcon icon={faCircleXmark}/>
                                </span>
                            </li>
                        })
                    }
                </ul>
            </div>
        }

        <div className={'file-upload__input'}>
            <label className={'btn btn--soft'} htmlFor={'file'}>{!preview ? label : 'Change file'}</label>
            <input
                id={'file'}
                multiple
                name={'file'}
                type={'file'}
                onChange={event => setFile((file) => removeDuplicates(file, event))}
            />
        </div>
    </div>
}

export default MultipleFileUpload
