import {Field, Form, Formik, FormikHelpers} from "formik"
import React from "react"
import {FilterType} from "../../redux/reducers/usersReducer"
import {useSelector} from "react-redux";
import {StateType} from "../../redux/reduxStore";

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";


type PropsType = {
    onFilterChanged: (filter: FilterType) => void
    filterFromState: FilterType
}

const userSearchValidate = (values: any) => {
    const errors = {}
    return errors
}

type FriendType = 'null' | 'true' | 'false'
type FormValues = {
    term: string,
    friend: FriendType
}

export const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChanged, filterFromState}) => {
    const submit = (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
        // Приводим строковые значения к нормальным
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    const {filter} = useSelector((state: StateType) => state.usersPage)
    return (
        <Container className="p-3">
            <Formik
                enableReinitialize  // Так как initialValues запускаются только один раз после рендеринга, то если что то изменилось, второй раз они не сразботают.
                                    // enableReinitialize позволяет переиспользовать инициализационнные даныые.
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendType}}
                validate={userSearchValidate}
                onSubmit={submit}>
                {(props) => (
                    <Form>
                        <div>
                            All props that recieves Formik Form:
                            <pre style={{height: '300px', overflow: "scroll"}}>
                                { JSON.stringify(Object.keys(props).sort(), null, 5)}
                            </pre>
                        </div>
                        <Field name="term" type="text" value={props.values.term}/>
                        <Field name="friend" as="select" value={props.values.friend}>
                            {/*Значения в формике в виде строк - нужна последующая конвнертация*/}
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <Button type="submit" disabled={props.isSubmitting} variant='primary'>Submit</Button>
                        <Button type="button" onClick={() => props.resetForm()} variant='danger'>reset form</Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
})