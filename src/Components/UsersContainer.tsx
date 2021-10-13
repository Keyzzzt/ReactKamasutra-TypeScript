import React from "react";
import {connect} from "react-redux";
import {requestUsers, follow, unFollow} from "../redux/reducers/usersReducer";
import Users from "./Users/Users";
import Loader from "./common/Loader";
import {
    getCurrentPage,
    getFollowUnfollowInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
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

}
type DispatchPropsType = {
    requestUsers: (pageNumber: number, pageSize: number) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}
type OwnProps = {}

class UsersContainer extends React.Component<MapPropsType & OwnProps & DispatchPropsType> {
    componentDidMount() {
        const {currentPage, pageSize, requestUsers} = this.props
        requestUsers(currentPage, pageSize)
    }

    setCurrentPageHandler = (pageNumber: number) => {
        const {requestUsers, pageSize} = this.props
        requestUsers(pageNumber, pageSize)
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
                        setCurrentPageHandler={this.setCurrentPageHandler}
                        follow={this.props.follow}
                        unFollow={this.props.unFollow}
                        isFetching={this.props.isFetching}
                        followUnfollowInProgress={this.props.followUnfollowInProgress}
                    />
                }
            </>
        )
    }
}


const mapStateToProps = (state: StateType): MapPropsType => {
    return {
        users: getUsersReselect(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followUnfollowInProgress: getFollowUnfollowInProgress(state)
    }
}
export default connect<MapPropsType, DispatchPropsType, OwnProps, StateType>(mapStateToProps, {
    requestUsers,
    follow,
    unFollow
})(UsersContainer)
