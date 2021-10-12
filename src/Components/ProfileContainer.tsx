import React from "react";
import {Profile} from "./Profile/Profile";
import {
    getStatusThunkCreator,
    getUsersProfileThunkCreator, saveProfile, updateProfileImage, updateStatus,
} from "../redux/reducers/profileReducer";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../HOC/WithAuthRedirect";
import {compose} from "redux";
import Loader from "./common/Loader";
import {StateType} from "../redux/reduxStore";
import {ProfileType} from "../Types";



type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUsersProfileThunkCreator: (userId: number) => void
    getStatusThunkCreator: (userId: number) => void
    updateStatus: (newStatusText: string) => void
    updateProfileImage: (image: File) => void
    saveProfile: (profile: ProfileType) => void
}
type OwnPropsType = {}
type OwnStateType = {}
type PathParamsType = {
    userId: string
}


type PropsType = MapPropsType & DispatchPropsType & OwnPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType>{
    updateProfile(){
        let userId: number | null = +this.props.match.params.userId
        if(!userId){
            userId = this.props.authorizedUserId
            if(!userId){
                // Todo: Replace push with Redirect (узнать почему push не очень)
                this.props.history.push('/login')
            }
        }
        if(!userId) {
            throw new Error('userId not found in URI params / state')
        } else {
            this.props.getUsersProfileThunkCreator(userId)
            this.props.getStatusThunkCreator(userId)
        }

    }
    componentDidMount() {
        this.updateProfile()
    }
    componentDidUpdate(prevProps: PropsType, prevState: OwnStateType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId){
            this.updateProfile()
        }
    }

    render(){
        return (
            <div>
                {!this.props.authorizedUserId && <Loader />}
                <Profile isOwner={!this.props.match.params.userId} {...this.props}/>
            </div>
        )
    }
}
// // Без compose()()
// // Добавляем обертку при помощи HOC, наделяя ее Redirect`ом
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
//
// // Теперь в ProfileContainerWithURL будут данные из URL - match, location, history.
// let ProfileContainerWithURL = withRouter(AuthRedirectComponent)
//
// export default connect(mapStateToProps, {getUsersProfileThinkCreator})(ProfileContainerWithURL)

const mapStateToProps = (state: StateType) => ({
    profile: state.profilePage.profile,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    editProfileSuccess: state.profilePage.editProfileSuccess
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUsersProfileThunkCreator, getStatusThunkCreator, updateStatus, updateProfileImage, saveProfile}),
    withAuthRedirect,
    withRouter
)(ProfileContainer)

// Todo: При изменении профиля, компонет не перезагружается послесохранения
