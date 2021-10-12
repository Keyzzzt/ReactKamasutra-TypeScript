import React, {ChangeEvent, useEffect, useState} from "react";

type PropsType  = {
    status: string
    updateStatus: (newStatusText: string) => void
}

 export const ProfileStatusHooks: React.FC<PropsType> = (props) => {
     const [localStateStatus, setLocalStateStatus] = useState(props.status)
     const [editMode, setEditMode] = useState(false)

     // useEffect принимает функцию, которую он выполнит после отрисовки компоненты.
     // Если в массиве зависимостей мы не укажем параметры от которых мы зависим, то useEffect запустится после каждой отрисовки.
     // Указав props.status в массиве зависимостей, мы вызываем useEffect всегда, когда придет новый props.status
     useEffect(() => {
         setLocalStateStatus(props.status)
     }, [props.status])


     const activateEditMode = () => {
         setEditMode(true)
     }
     const deActivateEditMode = () => {
         setEditMode(false)
         props.updateStatus(localStateStatus)
     }
     const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
         setLocalStateStatus(e.target.value)
     }

        return <>
            {!editMode &&
                <div>
                    <span>Status: </span>
                    <span onDoubleClick={activateEditMode}>{props.status || 'No status.'}</span>
                </div>
            }

            {editMode &&
            <div>
                <span>Status: </span>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deActivateEditMode} type="text" value={localStateStatus} />
            </div>
            }
        </>

}