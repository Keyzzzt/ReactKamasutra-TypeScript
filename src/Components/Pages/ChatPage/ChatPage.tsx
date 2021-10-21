import React, {useEffect, useState} from 'react'
import { ChatMessageType } from '../../../api/chat-api'
import {useDispatch, useSelector} from "react-redux";
import {sendNewMessage, startMessagesListening, stopMessagesListening} from "../../../redux/reducers/chatReducer";
import {StateType} from "../../../redux/reduxStore";


const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <ChatMessages />
            <AddChatMessageForm />
        </div>
    )
}

const ChatMessages: React.FC= () => {
    const messages = useSelector((state: StateType) => state.chat.messages)
    return (
        <div>
            {messages.map((m: any, index) => <Message message={m} key={index}/>)}
        </div>
    )
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

const AddChatMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendNewMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} name=""
                          placeholder='Add message text' />
            </div>
            <div>
                <button
                    onClick={sendMessageHandler}
                    disabled={false}> {/* Кнопка будет недоступна до тех пор, пока не установлено соединение.*/}
                    Send
                </button>
            </div>
        </div>
    )
}


export default ChatPage