import * as helpers from '@/helpers'
import {Fetcher} from 'ra-fetch'
import Link from 'next/link'

function NotificationsList({notifications, user}) {

    function submit(id) {
        Fetcher.api('backend').update('notifications', {
            id: id,
            read: 1,
        })
    }

    return <div className={'col-span-6 card card--np'}>
        <table className={'notifications-list'}>
            <thead>
            <tr className={'notifications-list__head'}>
                <td colSpan={3}><h2>Notifications</h2></td>
            </tr>
            <tr className={'notifications-list__description'}>
                <th>title</th>
                <th>description</th>
                <th>link</th>
            </tr>
            </thead>
            <tbody>
            {
                notifications.data.map((notification, index) => {
                    return <tr
                        className={`notifications-list__item ${notification.read ? 'notifications-list__item--read' : ''}`}
                        key={index}
                        onClick={() => submit(notification.id)}
                    >
                        <td className={'notifications-list__header'}>
                            <h3>{notification.title}</h3>
                            <span>{helpers.uploadTime(notification.created_at)}</span>
                        </td>
                        <td className={'mt-auto'}>{notification.description}</td>
                        <td className={'mt-auto mb-auto'}><Link className={'btn btn--label'} href={'/'}>{notification.src}</Link></td>
                    </tr>
                })
            }
            </tbody>
        </table>
    </div>
}

export default NotificationsList
