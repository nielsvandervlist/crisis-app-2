import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleDot, faFire, faEnvelope, faBuilding, faUser, faUsers, faClock, faPlus, faFile} from '@fortawesome/free-solid-svg-icons'
import {useRouter, usePathname} from 'next/navigation'
import {useAuthContext} from '@/components/Layouts/AuthContext'

function SidebarMain({user}) {

    const router = useRouter();
    const pathname = usePathname()

    return <div className={'sidebar__main'}>
        <nav>
            {
                (user?.roles[0].name === 'admin' || user?.roles[0].name === 'editor') &&
                <ul>
                    <li className={pathname.includes("/dashboard")  ? "active" : ""}>
                        <Link href={'/dashboard'}>
                            <FontAwesomeIcon icon={faCircleDot}/>Overview
                        </Link>
                    </li>
                    <li className={pathname.includes("/crises")  ? "active" : ""}>
                        <Link href={'/crises'}>
                            <FontAwesomeIcon icon={faFire}/>Crises
                        </Link>
                    </li>
                    <li className={pathname.includes('/posts') ? "active" : ""}>
                        <Link href={'/posts'}>
                            <FontAwesomeIcon icon={faEnvelope}/>Posts
                        </Link>
                    </li>
                    <li className={pathname.includes("/companies")  ? "active" : ""}>
                        <Link href={'/companies'}>
                            <FontAwesomeIcon icon={faBuilding}/>Companies
                        </Link>
                    </li>
                    <li className={pathname.includes("/participants")  ? "active" : ""}>
                        <Link href={'/participants'}>
                            <FontAwesomeIcon icon={faUser}/>Participants
                        </Link>
                    </li>
                    <li className={pathname.includes("/timelines")  ? "active" : ""}>
                        <Link href={'/timelines'}>
                            <FontAwesomeIcon icon={faClock}/>Timelines
                        </Link>
                    </li>
                    <li className={pathname.includes("/rapports")  ? "active" : ""}>
                        <Link href={'/rapports'}>
                            <FontAwesomeIcon icon={faClock}/>Reports
                        </Link>
                    </li>
                    <li className={pathname.includes("/documents")  ? "active" : ""}>
                        <Link href={'/documents'}>
                            <FontAwesomeIcon icon={faFile}/>Documents
                        </Link>
                    </li>
                </ul>
            }

            {
                user?.roles[0].name === 'participant' &&
                    <ul>
                        <li>
                            <Link href={'/participant-dashboard'}>
                                <FontAwesomeIcon icon={faCircleDot}/>Overview
                            </Link>
                        </li>
                    </ul>
            }
        </nav>
    </div>
}

export default SidebarMain
