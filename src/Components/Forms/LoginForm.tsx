import React from "react";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/reduxFormValidators";
import styles from './../common/FormsControls/formControls.module.css'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/reducers/authReducer";
import {InjectedFormProps, reduxForm} from "redux-form";
import {StateType} from "../../redux/reduxStore";

type MapPropsType = {
    captchaURL: string | null
    isAuth: boolean
}
type DispatchPropsType = {
    loginThunkCreator: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type OwnPropsType = {
    captchaURL: string | null
}
type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormNameValues = keyof FormDataType

const Login: React.FC<MapPropsType & DispatchPropsType> = ({loginThunkCreator, isAuth, captchaURL}) => {
    const onSubmit = ({email, password, rememberMe, captcha}: FormDataType) => {
        loginThunkCreator(email, password, rememberMe, captcha)
    }
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            {/*Тут передаем наш callback обязательно как onSubmit, в колбэк придет объект с данными из формы*/}
            <ReduxLoginForm onSubmit={onSubmit} captchaURL={captchaURL}/>
        </div>
    )
}
// Когда мы передаем функцию с замыканием в компоненту, она возвращает нам новую функцию
// поэтому начинаются проблемы, поэтому вызов maxLengthCreator нужно сделать за пределами компоненты
const maxLength20 = maxLengthCreator(20)



// В props redux-form закинет очень много дополнительного функционала
const Form: React.FC<InjectedFormProps<FormDataType, OwnPropsType> & OwnPropsType> = ({handleSubmit, error, captchaURL}) => {
    return (
        // redux-form закинет в props handleSubmit, он сделает preventDefault, соберет введенные данные и упакует их в объект
        // Этот объект будет состоять из ключей: name и значений: введенных польх
        // Тут в onSubmit обязательно передать handleSubmit из пропсов
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {createField<LoginFormNameValues>("email", "email", "Enter email", Input, [required, maxLength20])}
            {createField<LoginFormNameValues>("password", "password", "Enter password", Input, [required, maxLength20])}
            {createField<LoginFormNameValues>("rememberMe", "checkbox", undefined, Input, [], "Remember Me")}
            {captchaURL && <img src={captchaURL} alt=""/>}
            {captchaURL && createField<LoginFormNameValues>("captcha", "text", "Enter symbols", Input, [required])}
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
}
const mapStateToProps = (state: StateType) => ({
    captchaURL: state.auth.captchaURL,
    isAuth: state.auth.isAuth
})

const ReduxLoginForm = reduxForm<FormDataType, OwnPropsType>({form: 'login'})(Form)

export default connect(mapStateToProps, {loginThunkCreator})(Login);