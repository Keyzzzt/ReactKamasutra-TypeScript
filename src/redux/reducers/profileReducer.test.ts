import {actions, profileReducer} from "./profileReducer";

let state = {
    posts: [
        {id: 1, message: 'James', likesCount: 2},
        {id: 2, message: 'Bond', likesCount: 2},
        {id: 3, message: 'James Bond', likesCount: 2},
    ],
    profile: null,
    status: '',
    editProfileSuccess: false
}
it('newState.posts.length should be incremented', function () {
    let action = actions.addPostAC("Abracadabra")

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(4)
})


it('New post text should be ecual to Abracadabra', function () {
    let action = actions.addPostAC("Abracadabra")

    let newState = profileReducer(state, action)

    expect(newState.posts[3].message).toBe("Abracadabra")
})

it('likesCount should be 0', function () {
    let action = actions.addPostAC("Abracadabra")

    let newState = profileReducer(state, action)

    expect(newState.posts[3].likesCount).toBe(0)
})
