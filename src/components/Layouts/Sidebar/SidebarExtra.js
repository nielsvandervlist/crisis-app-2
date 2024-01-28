'use client'
import Link from 'next/link'
import Pusher from 'pusher-js'
import {useAuth} from '@/hooks/auth'
import {useEffect, useState} from 'react'
import Echo from 'laravel-echo'
import axios from '@/lib/axios'
import Popup from '@/components/Popup/Popup'
import useGetData from '@/hooks/useGetData'

function SidebarExtra() {

    const {user} = useAuth({middleware: 'auth'})
    const [message, setMessage] = useState()

    const [notifications, setNotifications] = useGetData('/api/notifications', {read: 0})

    useEffect(() => {
            const echo = new Echo({
                authEndpoint: '/broadcasting/auth',
                broadcaster: 'pusher',
                key: 'ec406300773b41b56bc0',
                cluster: 'eu',
                wsPort: 443,
                disableStats: true,
                encrypted: true,
                authorizer: (channel, options) => {
                    return {
                        authorize: (socketId, callback) => {
                            axios.post('/broadcasting/auth', {
                                socket_id: socketId,
                                channel_name: channel.name,
                            })
                                .then(response => {
                                    callback(null, response.data)
                                })

                                .catch(error => {
                                    callback(error)
                                })
                        },
                    }
                },
            })

            echo
                .private('App.Models.User.' + user?.id)
                .listen('.user.reaction', (data) => {
                    setNotifications((oldNotifications) => [...oldNotifications, data])
                })
            echo
                .channel('timeline-channel')
                .listen('.timeline.post', (data) => {

                    console.log(data)

                    setNotifications((oldNotifications) => [...oldNotifications, data])
                    setMessage(data)
                })
        }, [])

    return <div className={'sidebar__extra'}>
        <nav>
            <ul>
                <li>
                    <Link href={'/notifications'}>

                            Notifications
                            {
                                notifications &&
                                <span className={'notifications'}>
                                    <span>{notifications.length}</span>
                                </span>
                            }

                    </Link>
                </li>
                <li>
                    <Link href={'/chat'}>

                            {/*<FontAwesomeIcon icon="comment"/>*/}
                            Chat

                    </Link>
                </li>
            </ul>
        </nav>

        <Popup message={message} setMessage={setMessage}/>
    </div>
}

export default SidebarExtra
