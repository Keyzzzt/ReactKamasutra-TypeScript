import {chatAPI, ChatMessageType} from "../../api/chat-api";
import {BaseThunkType, InferActionTypes} from "../../Types";
import {Dispatch} from "redux";

type ActionType = InferActionTypes<typeof actions>
export type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionType>


const initialState = {
    messages: [] as ChatMessageType[]
}

export const chatReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'MESSAGES_RECEIVED':
            return {...state, messages: [...state.messages, ...action.payload]}
        default:
            return state
    }
}


export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({type: 'MESSAGES_RECEIVED', payload: messages} as const),
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (!_newMessageHandler) {
        return _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch, getState) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch, getState) => {
    chatAPI.unSubscribe(newMessageHandlerCreator(dispatch))
}

export const sendNewMessage = (message: string): ThunkType => async (dispatch, getState) => {
    chatAPI.sendMessage(message)
}
