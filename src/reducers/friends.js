import * as Types from "../constants/ActionTypes";

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_FRIEND:
            return [...action.friends];
        case Types.ADD_FRIEND:
            return [...state, action.friend];
        case Types.FRIEND_ONLINE:
            const onlineFriend = state.find(
                friend => friend.id === action.friend.id
            );
            if (onlineFriend) onlineFriend.online = true;
            return [...state];
        case Types.FRIEND_OFFLINE:
            const offlineFriend = state.find(
                friend => friend.id === action.friend.id
            );
            if (offlineFriend) offlineFriend.online = false;
            return [...state];
        default:
            return state;
    }
};

export default reducer;
