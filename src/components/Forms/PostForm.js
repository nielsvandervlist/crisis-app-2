import {useEffect, useState} from 'react'
import {useAuth} from '@/hooks/auth'
import Link from 'next/link'
import FileUpload from '@/components/FileUpload'
import {store, put} from '@/hooks/methods'
import useGetData from '@/hooks/useGetData'
import {useHandle} from '@/hooks/useHandle'

function PostForm({requestType, id, post}) {

    const {user} = useAuth({middleware: 'auth'})
    const [postTypes] = useGetData('/api/post_types')
    const [response, setResponse] = useState()
    const [errors, setErrors] = useState()

    const fieldsArray = ['title', 'description', 'post_type_id', 'online', 'thumbnail'];
    const { formData, handleChange, handleFile } = useHandle(fieldsArray);

    const { title, description, post_type_id, online, thumbnail } = formData;

    const handleInputChange = (e) => {
        handleChange(e);
    };

    if(!postTypes){
        return <></>
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const params = {
            ...formData,
            user_id: user?.id
        }

        if(requestType === 'post') {
            void store('api/posts', params, setResponse, setErrors)
        }
        else {
            void update(`api/posts/${id}`, ...formData, setResponse, setErrors)
        }
    }

    if (!user) {
        return <></>
    }

    return <form className={'card col-span-6 form'}>
        <fieldset>
            {
                postTypes.data.length > 0 &&
                <div className={'form__block'}>
                    <label>Type of post</label>
                    <select
                        value={formData.post_type_id}
                        name={'post_type_id'}
                        id={post_type_id}
                        onChange={handleInputChange}
                    >
                        <option>Select a option</option>
                        {
                            postTypes.data.map((type, index) => {
                                return <option name={type.name} key={index} value={type.id}>{type.name}</option>
                            })
                        }
                    </select>
                </div>
            }
            <div className={'form__block'}>
                <label>Title</label>
                <input
                    type={'text'}
                    value={title}
                    placeholder={'Title'}
                    onChange={handleInputChange}
                    id={'title'}
                    name={'title'}
                />
            </div>
            <div className={'form__block'}>
                <label>Description</label>
                <input
                    type={'text'}
                    value={description}
                    placeholder={'Description'}
                    onChange={handleInputChange}
                    id={'description'}
                    name={'description'}
                />
            </div>
            <FileUpload
                file={thumbnail}
                setFile={handleFile}
                label={'Add image to post'}
                name={'thumbnail'}
            />

            {
                id &&
                <div className={'form__block'}>
                    <label>Once set online the post appears on the overview page. The post can be seen by the
                        participants. Make sure the <Link className={'underline'} href={'/crises'}>crisis</Link> is running as well</label>
                    <input
                        type={'checkbox'}
                        value={online}
                        checked={!!online}
                        placeholder={'Online'}
                        onChange={handleInputChange}
                        id={'online'}
                        name={'online'}
                    />
                    <label htmlFor={'online'} className={'mr-4 mb-0'}>Set online</label>
                </div>
            }
        </fieldset>
        <div className={'flex items-center'}>
            {response && <div className={'btn btn--success'}>Post created</div>}
            {errors && <div className={'btn btn--error'}>{errors.errors[0]}</div>}
            <button className={'btn btn--primary ml-auto mt-4'} onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    </form>
}

export default PostForm
