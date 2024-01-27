function Form({title, setTitle, description, setDescription, image, setImage}) {
    return <>
        <div className={'form__block'}>
            <label>Title</label>
            <input
                type={'text'}
                value={title}
                placeholder={'Title'}
                onChange={event => setTitle(event.target.value)}
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
                onChange={event => setDescription(event.target.value)}
                id={'description'}
                name={'description'}
            />
        </div>
        <div className={'form__block'}>
            <label>Image</label>
            <input
                type={'file'}
                value={image}
                placeholder={'Title'}
                onChange={event => setImage(event.target.value)}
                id={'image'}
                name={'image'}
            />
        </div>
    </>
}

export default Form
