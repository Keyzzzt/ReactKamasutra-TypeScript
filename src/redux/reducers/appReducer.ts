import { InferActionTypes } from "../../Types";
import {getUserCredentialsThunkCreator} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {StateType} from "../reduxStore";
import {Dispatch} from "redux";

type ActionType = InferActionTypes<typeof actions>
type InitialStateType = typeof initialState
type ThunkType = ThunkAction<Promise<void>, StateType, any, ActionType>
type DispatchType = Dispatch<ActionType>

const initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET_INITIALIZED':
            return {...state, initialized: true}
        default:
            return state
    }
}
export const actions = {
    setInitializedSuccess: () => ({type: 'SET_INITIALIZED'} as const)
}

// Thunk creators
// TODO: Добавляя к этой санке TnumkType, падает ошибка
export const  initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getUserCredentialsThunkCreator())
        Promise.all([promise]).then(() => {
            dispatch(actions.setInitializedSuccess())
    })
}