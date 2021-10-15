import {Field, Form, Formik} from "formik"
import React from "react"
import {FilterType} from "../../redux/reducers/usersReducer"

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const userSearchValidate = (values: any) => {
    const errors = {}
    return errors
}

type FormValues = {
    term: string,
    friend: 'null' | 'true' | 'false'
}

export const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChanged}) => {
    const submit = (value: FormValues, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        // Приводим строковые значения к нормальным
        const filter: FilterType = {
            term: value.term,
            friend: value.friend === 'null' ? null : value.friend === 'true'
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }
    return (
        <div>
            <Formik initialValues={{term: '', friend: 'null'}} validate={userSearchValidate} onSubmit={submit}>
                {({isSubmitting}) => (
                    <Form>
                        <Field name="term" type="text"/>
                        <Field name="friend" as="select">
                            {/*Значения в формике в виде строк - нужна последующая конвнертация*/}
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})