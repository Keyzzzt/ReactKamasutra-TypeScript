import {ThunkAction} from "redux-thunk";
import {StateType} from "./redux/reduxStore";
import {Action} from "redux";

export type InferActionTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U :never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, StateType, any, A>


export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    status: string
}
export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type UserType = {
    name: string
    id: number
    uniqueUrlName: null | string
    photos: PhotosType
    status: string
    followed: boolean
}
export type FieldValidatorType = (value: string) => string | undefined
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}



