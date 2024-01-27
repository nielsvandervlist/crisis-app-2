import Echo from 'laravel-echo'
import {useEffect, useState} from 'react'
import axios from '@/lib/axios'
import Messagebox from '@/components/Chat/MessageBox'
import {Fetcher} from 'ra-fetch'

export default function RoomWrapper({user, chatRoomId}) {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState()
    const [subscribed, setSubscribed] = useState(false)
    const [first, setFirst] = useState(false)

    console.log(messages)

    useEffect(() => {
        if (user?.id && !first) {
            Fetcher.api('backend').show('chat_rooms', {
                'chatRoom': chatRoomId,
            })

            Fetcher.api('backend').show('messages', {
                id: chatRoomId,
            }).then(res => setMessages(res.data))

            setFirst(true)
        }
    }, [user?.id])

    useEffect(() => {
        if (!subscribed) {
            const echo = new Echo({
                broadcaster: 'pusher',
                key: 'ec406300773b41b56bc0',
                cluster: 'eu',
                wsPort: 443,
                forceTLS: true,
            })

            let channelName = 'chat-room.' + chatRoomId + '.' + user.id

            echo
                .channel(channelName)
                .subscribed(() => {
                    console.log('You are subscribed')
                })
                .listen('.message.new', (data) => {
                    setMessages((oldMessages) => [...oldMessages, data.message])
                    setMessage('')
                })

            setSubscribed(true)
        }
    }, [subscribed])

    async function handleSendMessage(e) {
        e.preventDefault()
        if (!user) {
            alert('Please add your username')
            return
        }
        if (!message) {
            alert('Please add a message')
            return
        }
        try {
            await axios.post(`/api/messages`, {
                room_id: chatRoomId,
                user: user,
                message: message,
            })
        } catch (error) {
            console.error(error)
        }
    }

    return <div className={'chat__active col-span-8 row-span-6'}>
        <div className={'chat__header mb-4'}>
            {/*<h1>{channelName}</h1>*/}
        </div>
        {
            messages &&
            <div className={'chat__messages mb-4'}>
                {messages.map((message, index) => (
                    <Messagebox key={index} message={message} user={user}/>
                ))}
            </div>
        }
        <div className={'chat__form'}>
            <form onSubmit={(e) => handleSendMessage(e)}>
                <div>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        className={'mb-4'}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button className={'btn btn--primary'} onClick={(e) => handleSendMessage(e)}>Send</button>
                </div>
            </form>
        </div>
    </div>
}
