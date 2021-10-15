import React from "react";
import {Route, BrowserRouter, Redirect} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import './styles/App.css'
import  { UsersPage } from "./Components/UsersPage";
import HeaderContainer from "./Components/HeaderContainer";
import Login from "./Components/Forms/LoginForm";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/reducers/appReducer";
import Loader from "./Components/common/Loader";
import store, {StateType} from "./redux/reduxStore";
import {WithSuspense} from "./HOC/withSuspense";

// Ленивая загрузка, эти копмоненты и их подкомпоненты не попадут в bundle.js и первоначальная загрузка выполнится быстрее.
// Таким образом мы ускоряем первоначальную загрузку, но замедляем дальнешую работу.
// Лениво загружают компоненты, которые редко / реже посещают, для этого нужна статистика посещений
const DialogsContainer = React.lazy(() => import('./Components/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./Components/ProfileContainer'))

const SuspendedDialogs = WithSuspense(DialogsContainer)
const SuspendedProfile = WithSuspense(ProfileContainer)

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}


class App extends React.Component<MapPropsType & DispatchPropsType> {
    handleUncatchedErrors = (e: PromiseRejectionEvent) => {
        alert('Some error occurred')
    }

    componentDidMount() {
        this.props.initializeApp()
        // Если мы в компоненте добавляет слушателя события, то его обязательно необходимо убрать при демонтаже компоненты.
        // В классовой компоненте это componentWillUnmount()
        window.addEventListener('unhandledrejection', this.handleUncatchedErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.handleUncatchedErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Loader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Redirect from="/" to="/profile"/>
                    <Route path='/dialogs' render={() => <SuspendedDialogs />}/>
                    {/*Если query параметр приходит не всегда, то нужен знак ?, иначе компонента не запустится*/}
                    <Route path='/profile/:userId?' render={() => <SuspendedProfile />}/>
                    <Route path='/users' render={() => <UsersPage />}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: StateType) => ({
    initialized: state.app.initialized
})

// В старом коде, можно увидеть еще один контейнер с withRouter
// Контейнерная компонента ниже нужна для теста
const AppContainer = connect(mapStateToProps, {initializeApp})(App)
export const MainApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

