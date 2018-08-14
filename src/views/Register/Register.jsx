import React, { Component } from "react";
import { callApiFormData } from "../../utils/callApi";
import { Redirect } from "react-router-dom";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            password: "",
            repassword: "",
            agreeterm: false,
            ready: false,
            successed: false,
            avatar: undefined,
            previewAvatar: undefined
        };
    }

    onHandleChange = event => {
        const target = event.target;
        const name = target.name;
        const value =
            target.type === "checkbox" ? target.checked : target.value;

        if (target.files) {
            const reader = new FileReader();
            const file = target.files[0];
            reader.onloadend = () => {
                this.setState({
                    avatar: file,
                    previewAvatar: reader.result
                });
            };
            reader.readAsDataURL(file);
        } else {
            this.setState({
                [name]: value
            });
        }
        console.log(this.state);
    };

    componentWillUpdate(nextProps, nextState) {
        const ready = this.validateInput(nextState);
        if (this.state.ready !== ready) this.setState({ ready });
    }

    validateInput(data) {
        const { name, username, password, repassword, agreeterm } = data;
        if (
            name === "" ||
            username === "" ||
            password === "" ||
            repassword !== password ||
            agreeterm === false
        ) {
            return false;
        }
        return true;
    }

    onSubmitForm = event => {
        event.preventDefault();
        this.setState({ error: undefined });
        const data = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            avatar: this.state.avatar
        };
        callApiFormData("signup", "POST", data)
            .then(res => {
                if (res.status === 204) this.setState({ successed: true });
            })
            .catch(err => {
                this.setState({ error: err.message });
            });
    };

    render() {
        if (this.state.successed) return <Redirect to="/login" />;
        return (
            <div className="wrapper wrapper-full-page">
                <div
                    className="page-header register-page header-filter"
                    filter-color="black"
                    style={{
                        backgroundImage: 'url("../../assets/img/register.jpg")'
                    }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 ml-auto mr-auto">
                                <div className="card card-signup">
                                    <h2 className="card-title text-center">
                                        Register
                                    </h2>
                                    {this.state.error && (
                                        <div
                                            className="alert alert-danger"
                                            style={{
                                                marginLeft: 100,
                                                marginRight: 100
                                            }}
                                        >
                                            <span>{this.state.error}</span>
                                        </div>
                                    )}
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-5 ml-auto">
                                                <div className="info info-horizontal">
                                                    <div className="icon icon-rose">
                                                        <i className="material-icons">
                                                            account_circle
                                                        </i>
                                                    </div>
                                                    <div className="description">
                                                        <h4 className="info-title">
                                                            Avatar
                                                        </h4>

                                                        <img
                                                            className="img-raised rounded-circle img-fluid"
                                                            alt="avatar"
                                                            src={
                                                                this.state
                                                                    .previewAvatar ||
                                                                "../../assets/img/faces/default-avatar.png"
                                                            }
                                                        />
                                                        <div className="text-center">
                                                            <span className="btn btn-round btn-rose btn-file">
                                                                <span>
                                                                    {this.state
                                                                        .previewAvatar
                                                                        ? "Change"
                                                                        : "Add Photo"}
                                                                </span>

                                                                <input
                                                                    name="avatar"
                                                                    type="file"
                                                                    onChange={
                                                                        this
                                                                            .onHandleChange
                                                                    }
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5 mr-auto">
                                                <form
                                                    className="form"
                                                    onSubmit={this.onSubmitForm}
                                                >
                                                    <div className="form-group has-default bmd-form-group">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">
                                                                    <i className="material-icons">
                                                                        face
                                                                    </i>
                                                                </span>
                                                            </div>
                                                            <input
                                                                name="name"
                                                                className="form-control"
                                                                placeholder="Full Name..."
                                                                type="text"
                                                                value={
                                                                    this.state
                                                                        .name
                                                                }
                                                                onChange={
                                                                    this
                                                                        .onHandleChange
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group has-default bmd-form-group">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">
                                                                    <i className="material-icons">
                                                                        vpn_key
                                                                    </i>
                                                                </span>
                                                            </div>
                                                            <input
                                                                name="username"
                                                                className="form-control"
                                                                placeholder="Username..."
                                                                type="text"
                                                                value={
                                                                    this.state
                                                                        .username
                                                                }
                                                                onChange={
                                                                    this
                                                                        .onHandleChange
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group has-default bmd-form-group">
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
                                                                placeholder="Password..."
                                                                className="form-control"
                                                                type="password"
                                                                value={
                                                                    this.state
                                                                        .password
                                                                }
                                                                onChange={
                                                                    this
                                                                        .onHandleChange
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group has-default bmd-form-group">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">
                                                                    <i className="material-icons">
                                                                        lock_outline
                                                                    </i>
                                                                </span>
                                                            </div>
                                                            <input
                                                                name="repassword"
                                                                placeholder="Password..."
                                                                className="form-control"
                                                                type="password"
                                                                value={
                                                                    this.state
                                                                        .repassword
                                                                }
                                                                onChange={
                                                                    this
                                                                        .onHandleChange
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label">
                                                            <input
                                                                name="agreeterm"
                                                                className="form-check-input"
                                                                checked={
                                                                    this.state
                                                                        .agreeterm
                                                                }
                                                                type="checkbox"
                                                                onChange={
                                                                    this
                                                                        .onHandleChange
                                                                }
                                                            />
                                                            <span className="form-check-sign">
                                                                <span className="check" />
                                                            </span>
                                                            I agree to the terms
                                                            and conditions
                                                        </label>
                                                    </div>
                                                    <div className="text-center">
                                                        <input
                                                            className="btn btn-primary btn-round mt-4"
                                                            type="submit"
                                                            disabled={
                                                                !this.state
                                                                    .ready
                                                            }
                                                            value="Register"
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
