'use client'
import Pusher from 'pusher-js'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import Echo from 'laravel-echo'
import axios from '@/lib/axios'
import Popup from '@/components/Popup/Popup'
import { useGet } from "@/hooks/methods"

function SidebarExtra({user}) {

    const [message, setMessage] = useState()
    const [notifications, setNotifications] = useGet('/api/notifications', {read: 0})

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
                    console.log(data)
                    // setNotifications((oldNotifications) => [...oldNotifications, data])
                })
            echo
                .channel('timeline-channel')
                .listen('.timeline.post', (data) => {

                  console.log(data)

                  // setNotifications((oldNotifications) =>
                  //   oldNotifications && oldNotifications.length > 0
                  //     ? [...oldNotifications, data]
                  //     : [data]
                  // )
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
