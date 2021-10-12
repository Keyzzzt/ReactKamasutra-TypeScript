import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {StateType} from "../redux/reduxStore";

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {}

const mapStateToProps = (state: StateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<P>(Component: React.ComponentType<P>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        // Вытаскиваем isAuth из props
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to='/login'/>
        return <Component {...restProps as P} />
    }

    let ConnectedRedirectComponent = connect<MapPropsType, {}, P, StateType>(mapStateToProps, {})(RedirectComponent)
    return ConnectedRedirectComponent
}