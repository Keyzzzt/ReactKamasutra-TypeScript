import React from "react";
import styles from "./Users.module.css";
import noPhoto from "../../assets/images/noLogo.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../Types";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../redux/reduxStore";
import {follow, unFollow} from "../../redux/reducers/usersReducer";

type PropsType = {
    user: UserType
}

export const SingleUser: React.FC<PropsType> = ({user}) => {
    const dispatch = useDispatch()
    const {followUnfollowInProgress} = useSelector((state: StateType) => state.usersPage)



    return (
        <div className={styles.user}>

            <div>
                <NavLink to={`/profile/${user.id}`}>
                    <img className={styles.userPhoto} src={user.photos.small ? user.photos.small : noPhoto} alt=""/>
                </NavLink>
            </div>
            <div>
                <div>ID: {user.id}</div>
                <div>Name: {user.name}</div>
                {user.followed ? (
                    <button onClick={() => {
                        dispatch(unFollow(user.id))
                    }} disabled={followUnfollowInProgress.some(id => id === user.id)}>Unfollow</button>
                ) : (
                    <button onClick={() => {
                        dispatch(follow(user.id))
                    }} disabled={followUnfollowInProgress.some(id => id === user.id)}>Follow</button>
                )}
            </div>
        </div>
    )
}
