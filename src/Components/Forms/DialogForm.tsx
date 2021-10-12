import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/reduxFormValidators";
import {DialogsFormDataType} from "../Dialogs/Dialogs";

// Когда мы передаем функцию с замыканием в компоненту, она возвращает нам новую функцию
// поэтому начинаются проблемы, поэтому вызов maxLengthCreator нужно сделать за пределами компоненты
const maxLength20 = maxLengthCreator(20)

type DialogFormNameValues = keyof DialogsFormDataType
type PropsType = {}


const Form: React.FC<InjectedFormProps<DialogsFormDataType, PropsType> & PropsType> = ({handleSubmit}) => {
    return (
        // Тут в onSubmit обязательно передать handleSubmit из пропсов
        <form onSubmit={handleSubmit}>
            <div>
                {/*Поле name, это имя значения, под которым он будет сохранен в объект*/}
                {createField<DialogFormNameValues>("newMessageBody", "password", "Message text", Textarea, [required, maxLength20])}
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
}

export default reduxForm<DialogsFormDataType, PropsType>({form: 'dialog'})(Form)
