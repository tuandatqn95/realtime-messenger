import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import ChatPage from "./views/ChatPage/ChatPage";
import { connect } from "react-redux";
import callApi from "./utils/callApi";
import { login, authFail } from "./actions/authAction";
import Loading from "./components/Loading/Loading";

class App extends Component {
    componentWillMount() {
        callApi("auth")
            .then(res => {
                this.props.onLogin(res.data.payload);
            })
            .catch(err => {
                this.props.onAuthFail();
            });
    }

    render() {
        const { isAuth } = this.props;

        return (
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route
                    path="/"
                    render={() => {
                        if (isAuth === true) return <ChatPage />;
                        if (isAuth === false) return <Redirect to="/login" />;
                        return <Loading />;
                    }}
                />
                <Route render={() => <h1>Not found</h1>} />
            </Switch>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.isAuth
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onLogin: (user, token) => dispatch(login(user, token)),
        onAuthFail: () => dispatch(authFail())
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
