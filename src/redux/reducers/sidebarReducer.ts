import {BaseThunkType, InferActionTypes} from "../../Types";

type InitialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>
// type ThunkType = BaseThunkType<ActionType>


let initialState = {}

export const sidebarReducer = (state = initialState, action: ActionType): InitialStateType => {
    return state
}

export const actions = {}
