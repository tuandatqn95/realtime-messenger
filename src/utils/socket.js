import io from "socket.io-client";
import { API_URL } from "./config";

export default function() {
    const socket = io.connect(API_URL);

    function login(user) {
        return socket.emit("login", user);
    }

    function fetchUser(onFriendsListener) {
        return socket.emit("get-friend-list", onFriendsListener);
    }

    function fetchMessage(conversationId, onMesagesListener) {
        return socket.emit("fetch-message", conversationId, onMesagesListener);
    }

    function openChat(friend, onConversationListener) {
        return socket.emit("open-chat", friend, onConversationListener);
    }

    function typing(conversationId, friendId) {
        return socket.emit("typing", conversationId, friendId);
    }

    function sendMessage(
        message,
        conversationId,
        friendId,
        onSendMessageListener
    ) {
        return socket.emit(
            "message",
            message,
            conversationId,
            friendId,
            onSendMessageListener
        );
    }

    function receiveMessage(message) {
        return socket.on("message", message);
    }

    function disconnect() {
        return socket.disconnect();
    }

    function onReconnect(attempt) {
        return socket.on("reconnect", attempt);
    }

    function onTyping(conversationId) {
        return socket.on("typing", conversationId);
    }

    function onFriendOnline(friend) {
        return socket.on("online", friend);
    }

    function onFriendOffline(friend) {
        return socket.on("offline", friend);
    }

    function onError(err) {
        return socket.on("error", err);
    }

    return {
        login,
        fetchUser,
        fetchMessage,
        sendMessage,
        receiveMessage,
        typing,
        disconnect,
        onTyping,
        onReconnect,
        onFriendOnline,
        onFriendOffline,
        openChat,
        onError
    };
}
