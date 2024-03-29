import { useAuthContext } from '@/components/Layouts/AuthContext';
import Link from 'next/link'
import FileUpload from '@/components/FileUpload'
import {useHandle} from '@/hooks/useHandle'
import { useGet } from "@/hooks/methods"

function PostForm({requestType, id, post}) {

    const user = useAuthContext();

    const [postTypes] = useGet('/api/post_types')
    const url = requestType === 'post' ? '/api/posts' : `/api/posts/${id}`
    const fieldsArray = ['title', 'description', 'post_type_id', 'online', 'thumbnail']
    const edit = requestType === 'update' ? post.data : null

    const params = {
        'user_id': user?.id,
    }

    let {
        formData,
        handleChange,
        handleFile,
        handleSubmit,
        response,
        errors
    } = useHandle(fieldsArray, url, requestType, params, edit)

    let { title, description, post_type_id, online, thumbnail } = formData

    if(!postTypes || !user){
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
                        onChange={handleChange}
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
                    value={formData.title}
                    placeholder={'Title'}
                    onChange={handleChange}
                    id={'title'}
                    name={'title'}
                />
            </div>
            <div className={'form__block'}>
                <label>Description</label>
                <input
                    type={'text'}
                    value={formData.description}
                    placeholder={'Description'}
                    onChange={handleChange}
                    id={'description'}
                    name={'description'}
                />
            </div>
            <FileUpload
                file={formData.thumbnail}
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
                        checked={online}
                        placeholder={'Online'}
                        onChange={handleChange}
                        id={'online'}
                        name={'online'}
                    />
                    <label htmlFor={'online'} className={'mr-4 mb-0'}>Set online</label>
                </div>
            }
        </fieldset>
        <div className={'flex items-center'}>
            {response && <div className={'btn btn--success'}>Post created</div>}
            {errors.length > 0 && <div className={'btn btn--error'}>{errors.errors[0]}</div>}
            <button className={'btn btn--primary ml-auto mt-4'} onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    </form>
}

export default PostForm
