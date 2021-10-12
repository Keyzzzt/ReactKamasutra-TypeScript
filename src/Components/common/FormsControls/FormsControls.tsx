import React from "react"
import styles from './formControls.module.css'
import {Field, WrappedFieldProps} from "redux-form"
import {FieldValidatorType} from "../../../Types"

const FormControl: React.FC<WrappedFieldProps> = ({meta: {touched, error}, children}) => {
    const isError = error && touched
    return (
        <div className={styles.formControl + ' ' + (isError ? styles.error : '')}>
            {/*Когда создаем оболочку над компонентой всегда нужно передать props дальше.*/}
            <div>
                {children}
            </div>
            {isError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export function createField<NameValues extends string> (
    name: NameValues,
    type: string,
    placeholder: string | undefined,
    component: React.FC<WrappedFieldProps>,
    validators: Array<FieldValidatorType>,
    textContent = "",
    props = {} ) {
    return (
        <div>
            <Field name={name} type={type} placeholder={placeholder} component={component}
                   validate={validators} {...props}/>
        </div>
    )
}