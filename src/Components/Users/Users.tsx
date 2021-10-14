import React from "react";
import Pagination from "../common/Pagination/Pagination";
import SingleUser from "./SingleUser";
import {UserType} from "../../Types";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../redux/reducers/usersReducer";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    setCurrentPageHandler: (pageNumber: number) => void
    users: Array<UserType>
    unFollow: (userId: number) => void
    follow: (userId: number) => void
    followUnfollowInProgress: Array<number>
    isFetching: boolean
    onFilterChanged: (filter: FilterType) => void
}

const Users: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, setCurrentPageHandler, users, unFollow, follow, followUnfollowInProgress, onFilterChanged}) => {
    let totalUserPages = Math.ceil(totalUsersCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= totalUserPages; i++) {
        pages.push(i)
    }
    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Pagination setCurrentPageHandler={setCurrentPageHandler} currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalUsersCount}/>
            {users.map(user => <SingleUser user={user} follow={follow} unFollow={unFollow}
                                           followUnfollowInProgress={followUnfollowInProgress} key={user.id}/>)}
        </div>
    )
}


export default Users