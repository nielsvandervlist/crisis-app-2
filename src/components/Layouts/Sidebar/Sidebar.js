import SidebarMain from '@/components/Layouts/Sidebar/SidebarMain'
import SidebarExtra from '@/components/Layouts/Sidebar/SidebarExtra'
import {useRouter} from 'next/navigation'

function Sidebar({user}) {

    return <div className={'sidebar'}>
        <div className={'sidebar__logo flex justify-center items-center'}>
            <div className={'w-8 h-8 mr-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" ><path fill="#D7E0FF" stroke="#4147D5" strokeLinecap="round" strokeLinejoin="round" d="M10.0646 0.839087C7.66685 2.2234 3.54771 5.13627 1.50475 6.81242C1.19647 7.06534 0.972509 7.41852 1.02712 7.81352C1.06365 8.07771 1.15737 8.41149 1.37087 8.78128C1.58437 9.15107 1.82657 9.39913 2.0371 9.56286C2.35187 9.80765 2.76971 9.79029 3.14289 9.64977C5.61596 8.71859 10.1982 6.60774 12.5959 5.22342C12.5959 5.22342 11.0468 5.54044 10.0311 3.78128C9.01548 2.02212 10.0646 0.839087 10.0646 0.839087Z" /><path fill="#ffffff" stroke="#4147D5" strokeLinecap="round" strokeLinejoin="round" d="M10.0312 3.78128C9.0155 2.02212 10.0646 0.839087 10.0646 0.839087C10.0646 0.839087 11.6137 0.522076 12.6293 2.28123C13.645 4.04039 12.5959 5.22342 12.5959 5.22342C12.5959 5.22342 11.0468 5.54044 10.0312 3.78128Z" /><path stroke="#4147D5" strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.79504L5 13.25" /><path stroke="#4147D5" strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.79504L10 13.25" /></svg>
            </div>
            <h1><b className={''}>cata</b></h1>
        </div>
        <SidebarMain user={user}/>
        <SidebarExtra />
    </div>
}

export default Sidebar
