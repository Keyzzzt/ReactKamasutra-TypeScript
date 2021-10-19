import React, {useEffect, useState} from 'react'


const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {
    const [webSocketChannel, setWebSocketChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const reconnectOnClose = () => {
            console.log('CLOSE')
            setTimeout(createChannel, 1000)
        }

        function createChannel() {

            ws?.removeEventListener('close', reconnectOnClose)
            ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', reconnectOnClose)
            ws.addEventListener('open', () => {
                console.log('web socket opened')
            })
            setWebSocketChannel(ws)
        }

        createChannel()

        return () => {
            ws?.removeEventListener('close', reconnectOnClose)
            ws?.close()
        }
    }, [])
    useEffect(() => {


    }, [webSocketChannel])

    return (
        <div>
            <ChatMessages webSocketChannel={webSocketChannel}/>
            <AddChatMessageForm webSocketChannel={webSocketChannel}/>
        </div>
    )
}

const ChatMessages: React.FC<{ webSocketChannel: WebSocket | null }> = ({webSocketChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        const loadMessages = (e: MessageEvent) => {
            setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
        };
        webSocketChannel?.addEventListener('message', loadMessages)

        return () => {
            webSocketChannel?.removeEventListener('message', loadMessages)
        }
    }, [webSocketChannel])
    return (
        <div>
            {messages.map((m: any, index) => <Message message={m} key={index}/>)}
        </div>
    )
}

type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type MessageProps = {
    message: ChatMessageType
}
const Message: React.FC<MessageProps> = ({message}) => {
    return (
        <div>
            <img style={{width: '25px'}} src={message.photo} alt="avatar"/><b>{message.userName}</b>
            <br/>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}

const AddChatMessageForm: React.FC<{ webSocketChannel: WebSocket | null }> = ({webSocketChannel}) => {
    const [message, setMessage] = useState('')
    const [webSocketStatus, setWebSocketStatus] = useState<'pending' | 'connected'>('pending')

    const sendMessage = () => {
        if (!message) return
        webSocketChannel?.send(message)
        setMessage('')
    }

    useEffect(() => {
        const webSocketStatus = () => {
            setWebSocketStatus('connected')
        }
        webSocketChannel?.addEventListener('open', webSocketStatus)
        return () => {
            webSocketChannel?.removeEventListener('open', webSocketStatus)
        }
    }, [webSocketChannel])
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} name=""
                          placeholder='Add message text'></textarea>
            </div>
            <div>
                <button
                    onClick={sendMessage}
                    disabled={webSocketStatus === 'pending' && webSocketChannel === null}> {/* Кнопка будет недоступна до тех пор, пока не установлено соединение.*/}
                    Send
                </button>
            </div>
        </div>
    )
}


export default ChatPage