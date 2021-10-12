import {BaseThunkType, DialogType, InferActionTypes, MessageType} from "../../Types"


type InitialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType>


let initialState = {
    dialogs: [
        {id: 1, name: 'James'},
        {id: 2, name: 'Bond'},
        {id: 3, name: 'James Bond'},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'Hola'},
    ] as Array<MessageType>,
}

export const dialogsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'CREATE_MESSAGE': {
            let newMessage = {id: 3, message: action.payload}
            return {...state, messages: [...state.messages, newMessage]}
        }
        default:
            return state
    }
}

export const actions = {
    createNewMessageAC: (newMessageText: string) => ({type: 'CREATE_MESSAGE', payload: newMessageText} as const)
}