import * as ActionTypes from "../constants/ActionTypes";

export const fetchFriend = friends => {
    return {
        type: ActionTypes.FETCH_FRIEND,
        friends
    };
};

export const addFriend = friend => {
    return {
        type: ActionTypes.ADD_FRIEND,
        friend
    };
};

export const friendOnline = friend => {
    return {
        type: ActionTypes.FRIEND_ONLINE,
        friend
    };
};

export const friendOffline = friend => {
    return {
        type: ActionTypes.FRIEND_OFFLINE,
        friend
    };
};
