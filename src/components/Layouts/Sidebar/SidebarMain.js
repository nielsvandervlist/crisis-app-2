import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useRouter, usePathname} from 'next/navigation'

function SidebarMain({user}){

    const router = useRouter();
    const pathname = usePathname()

    return <div className={'sidebar__main'}>
        <nav>
            {
                (user?.roles[0].name === 'admin' || user?.roles[0].name === 'editor') &&
                <ul>
                    <li className={pathname.includes("/dashboard")  ? "active" : ""}>
                        <Link href={'/dashboard'}>
                            {/*<FontAwesomeIcon icon="circle-dot"/>Overview*/}
                        </Link>
                    </li>
                    <li className={pathname.includes("/crises")  ? "active" : ""}>
                        <Link href={'/crises'}>
                            {/*<FontAwesomeIcon icon="fire"/>Crises*/}
                        </Link>
                    </li>
                    <li className={pathname.includes('/posts') ? "active" : ""}>
                        <Link href={'/posts'}>
                            {/*<FontAwesomeIcon icon="envelope"/>Posts*/}
                        </Link>
                    </li>
                    <li className={pathname.includes("/companies")  ? "active" : ""}>
                        <Link href={'/companies'}>
                            {/*<FontAwesomeIcon icon="building"/>Companies*/}
                        </Link>
                    </li>
                    <li className={pathname.includes("/participants")  ? "active" : ""}>
                        <Link href={'/participants'}>
                            {/*<FontAwesomeIcon icon="user"/>Participants*/}
                        </Link>
                    </li>
                    <li className={pathname.includes("/timelines")  ? "active" : ""}>
                        <Link href={'/timelines'}>
                            {/*<FontAwesomeIcon icon="clock"/>Timelines*/}
                        </Link>
                    </li>
                    <li className={pathname.includes("/rapports")  ? "active" : ""}>
                        <Link href={'/rapports'}>
                            {/*<FontAwesomeIcon icon="clock"/>Reports*/}
                        </Link>
                    </li>
                    <li className={pathname.includes("/documents")  ? "active" : ""}>
                        <Link href={'/documents'}>
                            {/*<FontAwesomeIcon icon="file"/>Documents*/}
                        </Link>
                    </li>
                </ul>
            }

            {
                user?.roles[0].name === 'participant' &&
                    <ul>
                        <li>
                            <Link href={'/participant-dashboard'}>
                                {/*<FontAwesomeIcon icon="circle-dot"/>Overview*/}
                            </Link>
                        </li>
                    </ul>
            }
        </nav>
    </div>
}

export default SidebarMain
