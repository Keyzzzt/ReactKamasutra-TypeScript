import {BaseThunkType, InferActionTypes} from "../../Types";
import {FormAction, stopSubmit} from "redux-form";
import {authAPI} from "../../api/auth-api";
import {ResultCodeEnum} from "../../api/api";


type InitialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>
// Ниже дополнение для loginThunkCreator, поскольку мы там диспачим не только тип ActionType, но и stopSubmit
// Вместо FormAction можно так же написать ReturnType<typeof stopSubmit>
// Так же расширение может быть нужно, когда мы диспачим экшн для другого редюсера.
type ThunkType = BaseThunkType<ActionType | FormAction>

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
}

export const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
            // ...action.payload идет после ...state, поэтому значения будут переопределены
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const),
    setCaptchaURL: (captchaURL: string) => ({type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaURL}} as const)
}


// Thunk creators
export const getUserCredentialsThunkCreator = (): ThunkType => async (dispatch, getState) => {
    const response = await authAPI.authMe()
    if (response.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = response.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    } else {
        // TODO: Error handling
        console.log('Error')
    }
}

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(getUserCredentialsThunkCreator())
    } else {
        if (response.resultCode === ResultCodeEnum.Captcha) {
            dispatch(getCaptchaURL())
        }
        //stopSubmit, В объекте можно передать отдельное поле, либо общее значение для формы через ключ _error
        let errorMessage = response.messages.length > 0 ? response.messages[0] : "Wrong credentials"
        dispatch(stopSubmit('login', {_error: errorMessage}))
    }
}

// При выходе сервер удалит cookies
export const logoutThunkCreator = (): ThunkType => async (dispatch, getState) => {
    const response = await authAPI.logout()
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
    const captchaURL = await authAPI.getCaptcha()
    dispatch(actions.setCaptchaURL(captchaURL))
}