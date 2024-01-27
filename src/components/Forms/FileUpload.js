import {useEffect, useState} from 'react'

function FileUpload({file, setFile, label}){

    const [preview, setPreview] = useState(file)

    useEffect(() => {
        if(file && typeof file !== 'string'){
            setPreview(URL.createObjectURL(file))
            }
    }, [file])

    return <div className={`file-upload ${preview ? 'file-upload--preview' : ''}`}>
        <div className={'file-upload__input w-full'}>
            <label className={'btn btn--primary text-center'} htmlFor={'file'}>{!preview ? label : 'Change file'}</label>
            <input id={'file'} name={'file'} type={'file'} onChange={event => setFile(event.target.files[0])} />
        </div>
            <div className={'file-upload__preview'}>
                {preview && <img src={preview} alt={'preview'}/>}
            </div>
    </div>
}

export default FileUpload
