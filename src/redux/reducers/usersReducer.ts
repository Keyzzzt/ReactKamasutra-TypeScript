import {updateObjectInArray} from "../../utils/reducerHelper";
import {BaseThunkType, InferActionTypes, UserType} from "../../Types";
import {Dispatch} from "redux";
import {usersAPI} from "../../api/users-api";
import {CommonResponse, ResultCodeEnum} from "../../api/api";


export type InitialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType>
type DispatchType = Dispatch<ActionType>
export type FilterType = typeof initialState.filter

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followUnfollowInProgress: [] as Array<number>, // Для того чтобы не disable все кнопки, мы сюда будем заносить UserID
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export const usersReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'TOGGLE_IS_FETCHING_USERS':
            return {...state, isFetching: action.payload}
        case 'SET_USERS':
            // return ниже будеть при новом запросе будет добавлять пользователей вниз списка
            // return {...state, users: [...state.users, ...action.payload]}

            // return ниже будеть при новом запросе будет показывать только пользователей с конкретной страницы
            return {...state, users: action.payload}
        case 'SET_TOTAL_COUNT':
            return {...state, totalUsersCount: action.payload}
        case 'TOGGLE_IS_FOLLOWING':
            return {
                ...state,
                followUnfollowInProgress: action.payload.isFetching
                    ?
                    // Нажали кнопку - занесли userId в массив followUnfollowInProgress
                    [...state.followUnfollowInProgress, action.payload.userId]
                    :
                    // Получили ответ с сервера - убрали userId из массива followUnfollowInProgress
                    [...state.followUnfollowInProgress.filter(id => id !== action.payload.userId)]
            }
        // case FOLLOW:
        //    return {...state, users: state.users.map(user => {
        //        if(user.id === action.payload){
        //            return {...user, followed: true}
        //        }
        //        return user
        //        })}
        case 'FOLLOW':
            return {...state, users: updateObjectInArray(state.users, action.payload, "id", {followed: true})}
        case 'UNFOLLOW':
            return {...state, users: updateObjectInArray(state.users, action.payload, "id", {followed: false})}
        // case UNFOLLOW:
        //     return {...state, users: state.users.map(user => {
        //             if(user.id === action.payload){
        //                 return {...user, followed: false}
        //             }
        //             return user
        //         })}
        case 'SET_ACTIVE_PAGE' :
            return {...state, currentPage: action.payload}
        case 'SET_FILTER':
            return {...state, filter: action.payload}
        default:
            return state
    }
}


export const actions = {
    followSuccessAC: (userId: number) => ({type: 'FOLLOW', payload: userId} as const),
    unFollowSuccessAC: (userId: number) => ({type: 'UNFOLLOW', payload: userId} as const),
    setUsersAC: (users: Array<UserType>) => ({type: 'SET_USERS', payload: users} as const),
    setCurrentPage: (pageNumber: number) => ({type: 'SET_ACTIVE_PAGE', payload: pageNumber} as const),
    setTotalUsersCountAC: (totalCount: number) => ({type: 'SET_TOTAL_COUNT', payload: totalCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING_USERS', payload: isFetching} as const),
    toggleFollowingProgressAC: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING',
        payload: {isFetching, userId}
    } as const),
    setUserSearchFilter: (filter: FilterType) => ({type: 'SET_FILTER', payload: filter} as const)
}

// Thunk creators
export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setUserSearchFilter(filter))
    const response = await usersAPI.getUsers(currentPage, pageSize, filter)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsersAC(response.items))
    dispatch(actions.setTotalUsersCountAC(response.totalCount))

}
// Функция для сокращения кода в follow & unFollow
const _followUnFollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: (userId: number) => Promise<CommonResponse>, actionCreator: (userId: number) => ActionType) => {
    dispatch(actions.toggleFollowingProgressAC(true, userId))
    const res = await apiMethod(userId)
    console.log(res)
    if (res.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgressAC(false, userId))
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
   await _followUnFollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccessAC)
}

export const unFollow = (userId: number): ThunkType => async (dispatch) => {
   await _followUnFollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), actions.unFollowSuccessAC)
}