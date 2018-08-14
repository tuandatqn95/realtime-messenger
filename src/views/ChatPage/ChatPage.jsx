import React, { Component } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import { connect } from "react-redux";

import * as friendActions from "../../actions/friendAction";
import Chatbox from "../../components/Chatbox/Chatbox";
import socket from "../../utils/socket";
import * as chattingActions from "../../actions/chattingAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: socket(),
            messages: [],
            notification: undefined
        };
    }

    componentDidMount() {
        this.state.client.login(this.props.loginUser);
        this.state.client.fetchUser((friends, err) => {
            if (err) return toast.error("Cannot get user list!");
            this.props.onFetchFriend(friends);
        });

        this.state.client.onFriendOnline(friend => {
            this.props.onFriendOnline(friend);
            toast.info(friend.name + " is online!");
        });

        this.state.client.onFriendOffline(friend => {
            this.props.onFriendOffline(friend);
            toast.warn(friend.name + " is offline!");
        });

        this.state.client.receiveMessage(message => {
            if (
                !this.props.chattings.some(
                    conversation => conversation.id === message.conversation
                )
            ) {
                const friend = this.props.friends.find(
                    friend => friend.id === message.sendBy
                );
                if (friend) this.onOpenChat(friend);
            }
        });

        this.state.client.onReconnect(attempt => {
            this.state.client.login(this.props.loginUser);
        });

        this.state.client.onError(err => {
            console.log(err);
        });
    }

    componentWillUnmount() {
        this.state.client.disconnect();
    }

    onOpenChat = friend => {
        this.state.client.openChat(friend, (conversation, err) => {
            if (err) return toast.error(err);
            this.props.onOpenChat(conversation);
        });
    };

    onCloseChat = friend => {
        this.props.onCloseChat(friend);
    };

    render() {
        const { chattings } = this.props;

        return (
            <div className="wrapper ">
                <div className="main-panel ps-container ps-theme-default ps-active-y">
                    <ToastContainer
                        position="top-left"
                        autoClose={3000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnVisibilityChange={false}
                        draggable={false}
                        pauseOnHover={false}
                    />

                    <div
                        className="content"
                        style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0
                        }}
                    >
                        <div
                            className="container-fluid chatbox-container"
                            style={{
                                display: "flex",
                                height: 500
                            }}
                        >
                            <Chatboxes
                                client={this.state.client}
                                chattings={chattings}
                                onCloseChat={this.onCloseChat}
                                loginUser={this.props.loginUser}
                            />
                        </div>
                    </div>
                </div>
                <Sidebar client={this.state.client} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loginUser: state.loginUser,
        friends: state.friends,
        chattings: state.chattings
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onFetchFriend: friends => dispatch(friendActions.fetchFriend(friends)),
        onCloseChat: friend => dispatch(chattingActions.closeChat(friend)),
        onFriendOnline: friend => dispatch(friendActions.friendOnline(friend)),
        onFriendOffline: friend =>
            dispatch(friendActions.friendOffline(friend)),
        onOpenChat: conversation =>
            dispatch(chattingActions.openChat(conversation))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatPage);

const Chatboxes = props => {
    return props.chattings
        .map(chatting => (
            <Chatbox
                key={chatting.id}
                loginUser={props.loginUser}
                client={props.client}
                conversation={chatting}
                onCloseChat={props.onCloseChat}
            />
        ))
        .reverse();
};
