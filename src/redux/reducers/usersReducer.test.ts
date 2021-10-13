import {actions, InitialStateType, usersReducer} from "./usersReducer";

let state: InitialStateType = {
    users: [
        {id: 0, name: 'James - 0', followed: false, status: 'status 0', uniqueUrlName: '', photos: {small: null, large: null}},
        {id: 1, name: 'James - 1', followed: false, status: 'status 1', uniqueUrlName: '', photos: {small: null, large: null}},
        {id: 2, name: 'James - 2', followed: true, status: 'status 2', uniqueUrlName: '', photos: {small: null, large: null}},
        {id: 3, name: 'James - 3', followed: true, status: 'status 3', uniqueUrlName: '', photos: {small: null, large: null}}
    ],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followUnfollowInProgress: [], // Для того чтобы не disable все кнопки, мы сюда будем заносить UserID
}

beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'James - 0', followed: false, status: 'status 0', uniqueUrlName: '', photos: {small: null, large: null}},
            {id: 1, name: 'James - 1', followed: false, status: 'status 1', uniqueUrlName: '', photos: {small: null, large: null}},
            {id: 2, name: 'James - 2', followed: true, status: 'status 2', uniqueUrlName: '', photos: {small: null, large: null}},
            {id: 3, name: 'James - 3', followed: true, status: 'status 3', uniqueUrlName: '', photos: {small: null, large: null}}
        ],
        pageSize: 100,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followUnfollowInProgress: [], // Для того чтобы не disable все кнопки, мы сюда будем заносить UserID
    }
})

test("follow success", () => {
    const newState = usersReducer(state, actions.followSuccessAC(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test("unfollow success", () => {
    const newState = usersReducer(state, actions.unFollowSuccessAC(3))
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})