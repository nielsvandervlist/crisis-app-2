'use client'
import {useAuth} from '@/hooks/auth'
// import { useRouter } from 'next/navigation'
import {useState} from 'react'
import Login from '@/components/Layouts/Navigation/Login'
import Hamburger from '@/components/Layouts/Navigation/Hamburger'
import Menu from '@/components/Layouts/Navigation/Menu'
import Link from 'next/link'

const Navigation = ({header, user}) => {
    // const router = useRouter()
    const { logout } = useAuth()

    const [open, setOpen] = useState(false)

    return (
        <nav className="bg-white border-b border-gray-100 m-6 mb-0 card">
            <div className="mx-auto">
                <div className="flex">
                    {header}
                    <Login user={user} logout={logout}/>
                    <Hamburger setOpen={setOpen} open={open}/>
                </div>
            </div>
            {/*{open && (*/}
            {/*    <Menu user={user} router={router} logout={logout}/>*/}
            {/*)}*/}
        </nav>
    )
}

export default Navigation
