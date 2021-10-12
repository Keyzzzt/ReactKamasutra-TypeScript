import React from 'react'
import style from './../../styles/Dialogs.module.css'
import {Message} from './Message'
import {DialogItem} from "./DialogItem";
import ReduxDialogForm from "../Forms/DialogForm";
import {DialogType, MessageType} from "../../Types";

type PropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    sendMessage: (newMessageBody: string) => void
}
export type DialogsFormDataType = {
    newMessageBody: string
}

export const Dialogs: React.FC<PropsType> = ({dialogs, messages, sendMessage}) => {
    const onSubmitHandler = (formData: DialogsFormDataType) => {
        sendMessage(formData.newMessageBody)
    }
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogs.map(el => <DialogItem key={el.id} name={el.name} id={el.id}/>)}
            </div>
            <div className={style.messages}>
                {messages.map(m => <Message key={m.id} message={m.message}/>)}
            </div>
            {/*Тут передаем наш callback обязательно как onSubmit, в колбэк придет объект с данными из формы*/}
            <ReduxDialogForm onSubmit={onSubmitHandler}/>
        </div>
    )
}