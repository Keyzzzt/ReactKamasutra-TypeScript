import React, {useEffect} from "react";
import Pagination from "../common/Pagination/Pagination";
import {SingleUser} from "./SingleUser";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, requestUsers} from "../../redux/reducers/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../redux/reduxStore";
import Loader from "../common/Loader";

type PropsType = {}

export const Users: React.FC<PropsType> = () => {
    const dispatch = useDispatch()
    const {users, totalUsersCount, pageSize, currentPage, filter, isFetching} = useSelector((state: StateType) => state.usersPage)


    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }


    let totalUserPages = Math.ceil(totalUsersCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= totalUserPages; i++) {
        pages.push(i)
    }


    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])
    return (
        <div>
            {isFetching ? <Loader/> : (
                <div>
                    <UsersSearchForm onFilterChanged={onFilterChanged}/>
                    <Pagination onPageChanged={onPageChanged} currentPage={currentPage} pageSize={pageSize}
                                totalItemsCount={totalUsersCount}/>
                    {users.map(user => <SingleUser user={user} key={user.id}/>)}
                </div>
            )}

        </div>
    )
}