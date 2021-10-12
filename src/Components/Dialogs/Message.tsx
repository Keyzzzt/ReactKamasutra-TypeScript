import React from 'react'
import style from '../../styles/Dialogs.module.css'

type PropsType = {
    message: string
}

export const Message: React.FC<PropsType> = ({message}) => {
    return (
        <div className={style.message}>{message}</div>
    )
}

