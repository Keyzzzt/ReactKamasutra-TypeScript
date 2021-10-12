import {stopSubmit} from "redux-form";
import {BaseThunkType, InferActionTypes, PhotosType, PostType, ProfileType} from "../../Types";
import {profileAPI} from "../../api/profile-api";
import {ResultCodeEnum} from "../../api/api";

type InitialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType>

let initialState = {
    posts: [
        {id: 1, message: 'James', likesCount: 2},
        {id: 2, message: 'Bond', likesCount: 2},
        {id: 3, message: 'James Bond', likesCount: 2},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    editProfileSuccess: false
}

export const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST': {
            let newPost = {
                id: 3,
                message: action.payload,
                likesCount: 0
            }
            return {...state, posts: [...state.posts, newPost]}
        }
        case 'SET_USER_PROFILE':
            return {...state, profile: action.payload}
        case 'GET_STATUS':
            // TODO: Нужно убрать status из initialState поскольку статус находится в профиле. Статус на данный момент не отображается из-за этого
            return {...state, status: action.payload}
        case 'UPDATE_PROFILE_IMAGE':
            // TODO: remove "as ProfileType"
            return {...state, profile: {...state.profile, photos: action.payload} as ProfileType}
        case 'EDIT_PROFILE_SUCCESS':
            return {...state, editProfileSuccess: action.payload}
        default:
            return state
    }
}

export const actions = {
    addPostAC: (newPostText: string) => ({type: 'ADD_POST', payload: newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', payload: profile} as const),
    setStatusAC: (status: string) => ({type: 'GET_STATUS', payload: status} as const),
    updateProfileImageAC: (photos: PhotosType) => ({type: 'UPDATE_PROFILE_IMAGE', payload: photos} as const),
    editProfileSuccess: (value: boolean) => ({type: 'EDIT_PROFILE_SUCCESS', payload: value} as const)
}

export const getUsersProfileThunkCreator = (userId: number | null): ThunkType => async (dispatch, getState) => {
    const response = await profileAPI.getUserProfile(userId)
    dispatch(actions.setUserProfile(response))
}
export const getStatusThunkCreator = (userId: number): ThunkType => async (dispatch, getState) => {
    try {
        const response = await profileAPI.getStatus(userId)
        dispatch(actions.setStatusAC(response))

    } catch (e) {
        // Этот блок выполнится если promise зарезолвится с ошибкой.
    }
}
export const updateStatus = (newStatusText: string): ThunkType => async (dispatch, getState) => {
    const response = await profileAPI.updateStatus(newStatusText)
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setStatusAC(newStatusText))
    }
}
export const updateProfileImage = (imageFile: File): ThunkType => async (dispatch, getState) => {
    const response = await profileAPI.updateProfileImage(imageFile)
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.updateProfileImageAC(response.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    dispatch({type: 'EDIT_PROFILE_SUCCESS', payload: false})
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.editProfileSuccess(true))
        dispatch(getUsersProfileThunkCreator(userId))

    } else {
        let errorMessage = response.messages[0]
        if (errorMessage) {
            dispatch(stopSubmit('editProfile', {_error: errorMessage}))
        } else {
            dispatch(stopSubmit('editProfile', {_error: 'Something went wrong with saving your profile.'}))

        }
    }
}