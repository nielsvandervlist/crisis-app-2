import { useRouter } from 'next/navigation'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default function BackButton() {
    const router = useRouter()

    return (
        <button className={'btn btn--primary'} onClick={() => router.back()}>
            <FontAwesomeIcon icon="arrow-left"/> <span className={'ml-2'}>Go back</span>
        </button>
    )
}
