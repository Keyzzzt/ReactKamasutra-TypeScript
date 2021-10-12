import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import {profileReducer} from "./reducers/profileReducer"
import {dialogsReducer} from "./reducers/dialogsReducer"
import {sidebarReducer} from "./reducers/sidebarReducer"
import {usersReducer} from "./reducers/usersReducer"
import {authReducer} from "./reducers/authReducer"
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import {appReducer} from "./reducers/appReducer"

const rootReducer = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebarPage: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,

})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
))

export type StateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.__store__ = store

export default store


