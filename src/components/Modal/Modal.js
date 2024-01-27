import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function Modal({open, setOpen, children, title}) {
    if (!open) {
        return <></>
    }

    return <div className={'modal fixed inset-0 z-20'}>
        <div className={'modal__bg fixed inset-0'}/>
        <div className={'modal__wrapper fixed w-2/3 left-1/2 top-1/2'}>
            <div className={'modal__block card z-20'}>
                <div className={'modal__header flex'}>
                    <h2>{title}</h2>
                    <span className={'ml-auto cursor-pointer'} onClick={() => setOpen(false)}><FontAwesomeIcon icon={'circle-xmark'}/></span>
                </div>
                <div className={'modal__content'}>
                    {children}
                </div>
            </div>
        </div>
    </div>
}

export default Modal
