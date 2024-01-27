function YoutubeForm({src, setSrc}){
    return <div className={'form__block'}>
        <label>Youtube Id</label>
        <input
            type={'text'}
            value={src}
            placeholder={'JOSyU7W'}
            onChange={event => setSrc(event.target.value)}
            id={'src'}
            name={'src'}
        />
    </div>
}

export default YoutubeForm
