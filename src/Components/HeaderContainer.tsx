import React from "react";
import {Header} from "./Header/Header";
import {connect} from "react-redux";
import {logoutThunkCreator} from "../redux/reducers/authReducer";
import {StateType} from "../redux/reduxStore";

type OwnPropsType = {}
type MapPropsType = {
    isAuth : boolean
    login: string | null
}
type DispatchPropsType = {
    logoutThunkCreator: () => void
}


class HeaderContainer extends React.Component<OwnPropsType & MapPropsType & DispatchPropsType>{
    render(){
        return <Header {...this.props}/>
    }
}
let mapStateToProps = (state: StateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect<MapPropsType, DispatchPropsType, OwnPropsType, StateType>(mapStateToProps, {logoutThunkCreator})(HeaderContainer)