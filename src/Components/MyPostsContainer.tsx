import {connect} from "react-redux";
import {DispatchPropsType, MapPropsType, MyPosts} from "./Profile/Myposts/MyPosts";
import {actions} from "../redux/reducers/profileReducer";
import {StateType} from "../redux/reduxStore";

let mapStateToProps = (state: StateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

export default connect<MapPropsType, DispatchPropsType, {}, StateType>(mapStateToProps, {
    addPost: actions.addPostAC
})(MyPosts)


