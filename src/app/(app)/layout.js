"use client"

import { useAuth } from "@/hooks/auth"
import Navigation from "@/components/Layouts/Navigation"
import Loading from "@/app/(app)/Loading"
import Sidebar from "@/components/Layouts/Sidebar/Sidebar"
import { AuthProvider } from "@/components/Layouts/AuthContext"

const AppLayout = ({ children, header }) => {

  const { user } = useAuth({ middleware: "auth" })

  if (!user) {
    return <Loading />
  }

  return (
    <AuthProvider user={user}>
      <div className="min-h-screen flex">
        <div className={"col-span-3"}>
          <Sidebar />
        </div>
        <div className={"w-full"}>
          <Navigation header={header} user={user} />
          <main className={"grid grid-cols-12 gap-4 p-6"}>{children}</main>
        </div>
      </div>
    </AuthProvider>
  )
}

export default AppLayout
