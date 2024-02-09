'use client'
import NotificationsList from '@/components/Lists/NotificationsList'
import { useGet } from "@/hooks/methods"
import { useAuthContext } from "@/components/Layouts/AuthContext"

const Notifications = () => {

    const user = useAuthContext();
    const [notifications, setNotifications] = useGet('/api/notifications', {
      user_id: user?.id
    })

    return (
      <>
            {notifications && <NotificationsList notifications={notifications} user={user}/>}
      </>
    )
}

export default Notifications
