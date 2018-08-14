import React, { Component } from "react";

class SidebarItem extends Component {
    render() {
        const { name, online, avatar } = this.props.friend;

        return (
            <li className="nav-item ">
                <a
                    className="nav-link"
                    onClick={() => this.props.onClick(this.props.friend)}
                >
                    <div className="friend-photo">
                        <img
                            src={
                                avatar || "/assets/img/faces/default-avatar.png"
                            }
                            onError={e =>
                                (e.target.src =
                                    "/assets/img/faces/default-avatar.png")
                            }
                            alt="avatar"
                        />
                    </div>
                    <p>
                        {name}
                        <span className={`dot ${online ? "online" : ""}`} />
                    </p>
                </a>
            </li>
        );
    }
}

export default SidebarItem;
