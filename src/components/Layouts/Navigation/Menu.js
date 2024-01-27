import ResponsiveNavLink, {ResponsiveNavButton} from '@/components/ResponsiveNavLink'

export default function Menu({router, user, logout}) {
    return <div className="block sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink
                href="/dashboard"
                active={router.pathname === '/dashboard'}>
                Dashboard
            </ResponsiveNavLink>
        </div>

        {/* Responsive Settings Options */}
        <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                    <svg
                        className="h-10 w-10 fill-current text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </div>

                <div className="ml-3">
                    <div className="font-medium text-base text-gray-800">
                        {user?.name}
                    </div>
                    <div className="font-medium text-sm text-gray-500">
                        {user?.email}
                    </div>
                </div>
            </div>

            <div className="mt-3 space-y-1">
                {/* Authentication */}
                <ResponsiveNavButton onClick={logout}>
                    Logout
                </ResponsiveNavButton>
            </div>
        </div>
    </div>
}
