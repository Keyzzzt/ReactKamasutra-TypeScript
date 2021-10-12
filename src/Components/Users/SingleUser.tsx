import React from "react";
import styles from "./Users.module.css";
import noPhoto from "../../assets/images/noLogo.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../Types";

type PropsType = {
    user: UserType
    unFollow: (userId: number) => void
    follow: (userId: number) => void
    followUnfollowInProgress: Array<number>
}

const SingleUser: React.FC<PropsType> = ({user, unFollow, follow, followUnfollowInProgress}) => {

    return (
                    <div className={styles.user}>
                        <div >
                            <NavLink to={`/profile/${user.id}`}>
                                <img className={styles.userPhoto} src={user.photos.small ? user.photos.small : noPhoto} alt=""/>
                            </NavLink>
                        </div>
                        <div>
                            <div>ID: {user.id}</div>
                            <div>Name: {user.name}</div>
                            {user.followed ? (
                                <button onClick={() => {unFollow(user.id) }} disabled={followUnfollowInProgress.some(id => id === user.id)}>Unfollow</button>
                            ) : (
                                <button onClick={() => {follow(user.id)}} disabled={followUnfollowInProgress.some(id => id === user.id)}>Follow</button>
                            )}
                        </div>
                    </div>
                )
}

export default SingleUser