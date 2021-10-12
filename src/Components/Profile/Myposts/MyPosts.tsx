import React from 'react';
import s from './../../../styles/MyPosts.module.css';
import {Post} from './Post/Post';
import AddPostReduxForm from "../../Forms/AddPostForm";
import {PostType} from "../../../Types";


// Тут разбил пропсы, чтобы типизировать connect в MyPostsContainer
export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}
export type AddPostFormDataType = {
    newPostText: string
}

export const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    let postList = props.posts.map(p => <Post key={p.id} message={p.message}/>);

    const onSubmitHandler = ({newPostText}: AddPostFormDataType) => {
        props.addPost(newPostText)
    }

    return (
        <div className={s.myPosts}>
            <h3>My Posts</h3>
            {/* Тут передаем наш callback обязательно как onSubmit, в колбэк придет объект с данными из формы */}
            <AddPostReduxForm onSubmit={onSubmitHandler}/>
            {postList}
        </div>
    );
}