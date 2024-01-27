import {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Fetcher} from 'ra-fetch'

function MultipleFileUpload({file, setFile, label, documents, filesOnly}) {

    const [preview, setPreview] = useState()
    const [filePreview, setFilePreview] = useState([])
    const [error, setError] = useState()

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

        Fetcher.api('backend').delete('documents', {
            id: id,
        }).then(res => {
            console.log(res)
        })
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
        {
            preview &&
            <div className={'file-upload__preview'}>
                <img src={preview}/>
            </div>
        }
        {
            filePreview &&
            <div className={'file-upload__file-preview'}>
                <ul>
                    {
                        filePreview.map((file, index) => {
                            return <li key={index} className={'flex items-center'}>
                                {file.name}
                                <span
                                    className={'pl-6 ml-auto text-primarysoft cursor-pointer'}
                                    onClick={() => removeDocument(file.name, file.id)}
                                >
                                    <FontAwesomeIcon icon={'circle-xmark'}/>
                                </span>
                            </li>
                        })
                    }
                </ul>
            </div>
        }
    </div>
}

export default MultipleFileUpload
