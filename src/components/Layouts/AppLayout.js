import Navigation from '@/components/Layouts/Navigation'
import useAuth from '@/hooks/auth'
import Sidebar from '@/components/Layouts/Sidebar/Sidebar'

const AppLayout = ({ header, children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className="min-h-screen flex">
            <div className={'col-span-3'}>
                <Sidebar user={user}/>
            </div>
            <div className={'w-full'}>
                <Navigation header={header} user={user} />
                <main className={'grid grid-cols-12 gap-4 p-6'}>{children}</main>
            </div>
        </div>
    )
}

export default AppLayout
