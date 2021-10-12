import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "../../styles/MyPosts.module.css";
import {maxLengthCreator, required} from "../../utils/reduxFormValidators";
import {createField, Textarea} from "../common/FormsControls/FormsControls";
import {AddPostFormDataType} from "../Profile/Myposts/MyPosts";

// Когда мы передаем функцию с замыканием в компоненту, она возвращает нам новую функцию
// поэтому начинаются проблемы, поэтому вызов maxLengthCreator нужно сделать за пределами компоненты
const maxLength50 = maxLengthCreator(50)

type PropsType = {}
type AddPostFormNameValues = keyof AddPostFormDataType

const Form: React.FC<InjectedFormProps<AddPostFormDataType, PropsType> & PropsType> = (props) => {
    return (
        // Тут в onSubmit обязательно передать handleSubmit из пропсов
        <form onSubmit={props.handleSubmit} className={s.newPost}>
            <div>
                {createField<AddPostFormNameValues>("newPostText", "text", "Enter text", Textarea, [required, maxLength50])}
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormDataType, PropsType>({form: 'addPost'})(Form)