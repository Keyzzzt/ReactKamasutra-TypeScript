import {connect} from "react-redux";
import {Dialogs} from "./Dialogs/Dialogs";
import {actions} from "../redux/reducers/dialogsReducer";
import {withAuthRedirect} from "../HOC/WithAuthRedirect";
import {compose} from "redux";
import {StateType} from "../redux/reduxStore";

let mapStateToProps = (state: StateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
}

// // Без compose
// // Добавляем обертку при помощи HOC, наделяя ее Redirect`ом
// const DialogsWithRedirect = withAuthRedirect(Dialogs)
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsWithRedirect)

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}), // так можно передать все action creators
    withAuthRedirect
)(Dialogs)


