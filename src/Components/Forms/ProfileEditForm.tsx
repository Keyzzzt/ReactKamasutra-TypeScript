import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import style from "../../styles/Profile.module.css";
import {createField, Input} from "../common/FormsControls/FormsControls";
import styles from "../common/FormsControls/formControls.module.css";
import {ProfileType} from "../../Types";

type PropsType = {
    profile: ProfileType
}
type ProfileEditFormNameValues = keyof ProfileType

const Form: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return (
        // Тут в onSubmit обязательно передать handleSubmit из пропсов
        <form onSubmit={handleSubmit} className={style.profileInfo}>
            <button>Save</button>
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <b>Full name: </b>{createField<ProfileEditFormNameValues>('fullName', 'text', 'Enter full name...', Input, [])}
            </div>
            <div>
                <b>Looking for a job: </b>{createField<ProfileEditFormNameValues>('lookingForAJob', '', '', Input, [], '', {type: "checkbox"})}
            </div>
            <div>
                <b>Job
                    description: </b>{createField<ProfileEditFormNameValues>('lookingForAJobDescription', 'text', 'Job description...', Input, [])}
            </div>

            <div><b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key}>
                    <b>{key}</b>: {createField(`contacts.${key}`, 'text', key, Input, [])}
                </div>
            })}</div>
        </form>
    )
}

export default reduxForm<ProfileType, PropsType>({form: 'editProfile'})(Form);


