import React from "react";
import {connect} from "react-redux";
import {requestUsers, follow, unFollow, FilterType} from "../redux/reducers/usersReducer";
import Users from "./Users/Users";
import Loader from "./common/Loader";
import {
    getCurrentPage,
    getFollowUnfollowInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter,
    getUsersReselect
} from "../redux/usersSelectors";
import {UserType} from "../Types";
import {StateType} from "../redux/reduxStore";

// Разбив на разные пропсы, мы можем дополнительно проверить что возвращает mapStateToProps и mapDispatchToProps
type MapPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followUnfollowInProgress: Array<number>
    filter: FilterType

}
type DispatchPropsType = {
    requestUsers: (pageNumber: number, pageSize: number, filter: FilterType) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}
type OwnProps = {}

class UsersContainer extends React.Component<MapPropsType & OwnProps & DispatchPropsType> {
    componentDidMount() {
        const {currentPage, pageSize, requestUsers, filter} = this.props
        requestUsers(currentPage, pageSize, filter) // term - условие
    }
    onPageChanged = (pageNumber: number) => {
        const {requestUsers, pageSize, filter} = this.props
        requestUsers(pageNumber, pageSize, filter)
    }
    onFilterChanged = (filter: FilterType) => {

        const {currentPage, pageSize, requestUsers} = this.props
        requestUsers(currentPage, pageSize, filter)

    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Loader/> :
                    <Users
                        totalUsersCount={this.props.totalUsersCount}
                        currentPage={this.props.currentPage}
                        users={this.props.users}
                        pageSize={this.props.pageSize}
                        setCurrentPageHandler={this.onPageChanged}
                        follow={this.props.follow}
                        unFollow={this.props.unFollow}
                        isFetching={this.props.isFetching}
                        followUnfollowInProgress={this.props.followUnfollowInProgress}
                        onFilterChanged={this.onFilterChanged}
                    />
                }
            </>
        )
    }
}


const mapStateToProps = (state: StateType): MapPropsType => {
    return {
        // Тут значения возвращают селекторы
        users: getUsersReselect(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followUnfollowInProgress: getFollowUnfollowInProgress(state),
        filter: getUsersFilter(state)
    }
}
export default connect<MapPropsType, DispatchPropsType, OwnProps, StateType>(mapStateToProps, {
    requestUsers,
    follow,
    unFollow
})(UsersContainer)
