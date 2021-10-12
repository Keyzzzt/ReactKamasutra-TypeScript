import React from 'react'
import s from '../../styles/Dialogs.module.css'
import { NavLink } from 'react-router-dom'

type PropsType = {
    name: string
    id: number
}
export const DialogItem: React.FC<PropsType> = ({ name, id }) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
        </div>
    )
}
