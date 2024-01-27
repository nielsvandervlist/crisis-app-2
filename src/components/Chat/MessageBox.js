function Messagebox({message, user}) {

    return (
        <div className={`message ${message.user === user.name ? 'message--active' : ''}`}>
            <div className={'message__wrapper'}>
                <p className={'message__box'}>{message}</p>
            </div>
        </div>
    )
}

export default Messagebox
