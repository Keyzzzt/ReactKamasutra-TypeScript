import {createSelector} from "reselect";
import {StateType} from "./reduxStore";


const getUsers = (state: StateType) => {
    return state.usersPage.users
}
export const getUsersReselect = createSelector(getUsers, (users) => {
    return users.filter(u => true)
})
export const getPageSize = (state: StateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: StateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: StateType) => {
    return state.usersPage.pageNumber
}
export const getIsFetching = (state: StateType) => {
    return state.usersPage.isFetching
}
export const getFollowUnfollowInProgress = (state: StateType) => {
    return state.usersPage.followUnfollowInProgress
}
export const getUsersFilter = (state: StateType) => {
    return state.usersPage.filter
}


