import React, { Component } from "react";
import SidebarItem from "./SidebarItem";
import { connect } from "react-redux";
import { openChat } from "../../actions/chattingAction";
import { toast } from "react-toastify";
import { Scrollbars } from "react-custom-scrollbars";
import { logout } from "../../actions/authAction";

class Sidebar extends Component {
    onOpenChat = friend => {
        this.props.client.openChat(friend, (conversation, err) => {
            if (err) return toast.error(err);
            this.props.onOpenChat(conversation);
        });
    };

    render() {
        const { loginUser, friends } = this.props;
        return (
            <div
                className="sidebar"
                data-color="rose"
                data-background-color="black"
                data-image="../assets/img/sidebar-1.jpg"
            >
                {/*
            Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"
          
            Tip 2: you can also add an image using data-image tag
              */}

                <div className="sidebar-wrapper ps-container ps-theme-default ps-active-y">
                    <div className="user">
                        <div className="photo">
                            <img
                                src={
                                    loginUser.avatar
                                        ? loginUser.avatar
                                        : "/assets/img/faces/default-avatar.png"
                                }
                                alt=""
                            />
                        </div>
                        <div className="user-info">
                            <a
                                data-toggle="collapse"
                                href="#collapseExample"
                                className="username"
                            >
                                <span>
                                    {loginUser.name}
                                    <b className="caret" />
                                </span>
                            </a>
                            <div className="collapse" id="collapseExample">
                                <ul className="nav">
                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <span className="sidebar-normal">
                                                {" "}
                                                My Profile{" "}
                                            </span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <span className="sidebar-normal">
                                                {" "}
                                                Edit Profile{" "}
                                            </span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            onClick={this.props.onLogout}
                                        >
                                            <span className="sidebar-normal">
                                                {" "}
                                                Logout{" "}
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <Scrollbars universal={true}>
                        <ul className="nav">
                            <SidebarItems
                                friends={friends}
                                onClick={this.onOpenChat}
                            />
                        </ul>
                    </Scrollbars>
                </div>
                <div
                    className="sidebar-background"
                    style={{
                        backgroundImage: "url(../assets/img/sidebar-1.jpg)"
                    }}
                />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        friends: state.friends,
        loginUser: state.loginUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onOpenChat: conversation => dispatch(openChat(conversation)),
        onLogout: () => dispatch(logout())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);

const SidebarItems = props => {
    return props.friends.map((friend, index) => {
        return (
            <SidebarItem key={index} friend={friend} onClick={props.onClick} />
        );
    });
};
