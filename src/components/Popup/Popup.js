import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useEffect, useState} from 'react'
import Link from 'next/link'
import { faCross, faXmark } from "@fortawesome/free-solid-svg-icons"

function Popup({message, setMessage}) {

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(false)
        }, 15000);
        return () => clearTimeout(timer);
    }, []);

    return <div className={`popup ${message ? 'popup--show' : ''}`}>
        <div className={'popup__header'}>
            <h2>{message ? message.title : ''}</h2>
            <span className={'ml-auto cursor-pointer'} onClick={() => setMessage(false)}>
                <FontAwesomeIcon icon={faXmark}/>
            </span>
        </div>
        <div className={'popup__body'}>
            <p className={'mb-4'}>{message ? message.description : ''}</p>
            <Link className={'btn btn--primary'} href={'/dashboard'}>Link to notification</Link>
        </div>
    </div>
}

export default Popup
