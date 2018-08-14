import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import callApi from "../../utils/callApi";
import { connect } from "react-redux";
import { login } from "../../actions/authAction";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    onHandleChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    };

    onSubmitForm = event => {
        event.preventDefault();
        this.setState({ error: undefined });
        const body = {
            username: this.state.username,
            password: this.state.password
        };
        callApi("login", "POST", body)
            .then(res => {
                this.props.onLogin(res.data.payload, res.data.token);
            })
            .catch(err => {
                this.setState({ error: err.message });
            });
    };

    render() {
        if (this.props.isAuth) {
            return <Redirect to="/" />;
        }
        return (
            <div className="wrapper wrapper-full-page">
                <div
                    className="page-header login-page header-filter"
                    filter-color="black"
                    style={{
                        backgroundImage: 'url("../../assets/img/login.jpg")',
                        backgroundSize: "cover",
                        backgroundPosition: "top center"
                    }}
                >
                    {/*   you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " */}
                    <div className="container">
                        <div className="col-lg-4 col-md-6 col-sm-6 ml-auto mr-auto">
                            <form className="form" onSubmit={this.onSubmitForm}>
                                <div className="card card-login">
                                    <div className="card-header card-header-rose text-center">
                                        <h4 className="card-title">Login</h4>
                                    </div>
                                    {this.state.error && (
                                        <div
                                            className="alert alert-warning"
                                            style={{
                                                marginLeft: 15,
                                                marginRight: 15
                                            }}
                                        >
                                            <span>{this.state.error}</span>
                                        </div>
                                    )}
                                    <div className="card-body ">
                                        <span className="bmd-form-group">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="material-icons">
                                                            face
                                                        </i>
                                                    </span>
                                                </div>
                                                <input
                                                    name="username"
                                                    className="form-control"
                                                    placeholder="First Name..."
                                                    type="text"
                                                    onChange={
                                                        this.onHandleChange
                                                    }
                                                />
                                            </div>
                                        </span>

                                        <span className="bmd-form-group">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="material-icons">
                                                            lock_outline
                                                        </i>
                                                    </span>
                                                </div>
                                                <input
                                                    name="password"
                                                    className="form-control"
                                                    placeholder="Password..."
                                                    type="password"
                                                    onChange={
                                                        this.onHandleChange
                                                    }
                                                />
                                            </div>
                                        </span>
                                    </div>
                                    <div className="card-footer justify-content-center">
                                        <input
                                            type="submit"
                                            className="btn btn-rose btn-link btn-lg"
                                            value="Login"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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
        onLogin: (user, token) => dispatch(login(user, token))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
