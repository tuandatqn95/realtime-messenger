import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Typing from "../Loading/Typing";

class Chatbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversation: props.conversation,
            isMinimum: false,
            isTyping: false,
            texting: "",
            messages: []
        };
    }

    componentDidMount() {
        this.props.client.fetchMessage(this.state.conversation.id, messages => {
            this.setState({ messages: messages });
            this.refs.scrollbar.scrollToBottom();
        });

        this.props.client.receiveMessage(message => {
            if (message.conversation === this.state.conversation.id) {
                let top = this.refs.scrollbar.getValues().top;
                clearTimeout(this.typingTimeOut);
                this.setState(
                    {
                        messages: [...this.state.messages, message]
                    },
                    () => {
                        this.fixScrollBar(top);
                    }
                );
            }
        });

        this.props.client.onTyping(conversationId => {
            if (conversationId === this.state.conversation.id) {
                let top = this.refs.scrollbar.getValues().top;
                this.onTyping();
                this.fixScrollBar(top);
            }
        });
    }

    fixScrollBar(top) {
        if (top >= 1) {
            this.refs.scrollbar.scrollToBottom();
        }
    }

    toggleBox = () => {
        this.setState({
            isMinimum: !this.state.isMinimum
        });
    };

    onChatSubmit = event => {
        event.preventDefault();
        const { texting, conversation } = this.state;
        if (this.state.texting !== "")
            this.props.client.sendMessage(
                texting,
                conversation.id,
                conversation.friend.id,
                message => {
                    let top = this.refs.scrollbar.getValues().top;
                    this.setState(
                        {
                            messages: [...this.state.messages, message]
                        },
                        () => {
                            this.fixScrollBar(top);
                        }
                    );
                }
            );
        this.setState({
            texting: ""
        });
    };

    onHandleChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
        const conversation = this.state.conversation;
        if (this.state.texting)
            this.props.client.typing(conversation.id, conversation.friend.id);
    };

    onTyping = () => {
        clearTimeout(this.typingTimeOut);
        this.setState({
            isTyping: true
        });
        this.typingTimeOut = setTimeout(() => {
            this.setState({
                isTyping: false
            });
        }, 3000);
    };

    render() {
        const { conversation, isMinimum, messages } = this.state;
        const { loginUser } = this.props;

        return (
            <div className="card chatbox">
                <div className="card-header card-header-text card-header-success">
                    <div className="card-text" onClick={this.toggleBox}>
                        <h4 className="card-title">
                            <a>{conversation.friend.name}</a>
                        </h4>
                    </div>
                    <button
                        type="button"
                        className="btn btn-danger btn-link btn-sm pull-right btn-close"
                        onClick={() => this.props.onCloseChat(conversation)}
                    >
                        <i className="material-icons">close</i>
                        <div className="ripple-container" />
                    </button>
                </div>
                {!isMinimum && [
                    <div
                        key="1"
                        className="card-body"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            overflowY: "auto"
                        }}
                    >
                        <Scrollbars ref="scrollbar" autoHide={true}>
                            <ul className="timeline chatlog">
                                <ChatMessages
                                    messages={messages}
                                    user={loginUser}
                                />
                                <TypingElement isTyping={this.state.isTyping} />
                            </ul>
                        </Scrollbars>
                    </div>,
                    <div key="2" className="card-footer">
                        <form
                            style={{ width: "100%" }}
                            onSubmit={this.onChatSubmit}
                        >
                            <input
                                autoComplete="off"
                                name="texting"
                                className="form-control"
                                placeholder="Type a message..."
                                type="text"
                                value={this.state.texting}
                                onChange={this.onHandleChange}
                            />
                        </form>
                    </div>
                ]}
            </div>
        );
    }
}

export default Chatbox;

const ChatMessage = props => {
    return (
        <li
            className={
                props.isTheirs ? "timeline-inverted" : "timeline-uninverted"
            }
        >
            <div className="timeline-panel">
                <div className="timeline-body">
                    <p>{props.message}</p>
                </div>
            </div>
        </li>
    );
};

const ChatMessages = props => {
    return props.messages.map((message, index) => {
        return (
            <ChatMessage
                key={index}
                message={message.message}
                isTheirs={props.user.id !== message.sendBy}
            />
        );
    });
};

const TypingElement = props => {
    if (props.isTyping)
        return (
            <li className="timeline-inverted">
                <div className="timeline-panel">
                    <div className="timeline-body">
                        <Typing />
                    </div>
                </div>
            </li>
        );
    return null;
};
