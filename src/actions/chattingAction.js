import * as ActionTypes from "../constants/ActionTypes";

export const openChat = conversation => {
    return {
        type: ActionTypes.OPEN_CHATBOX,
        conversation
    };
};

export const closeChat = conversation => {
    return {
        type: ActionTypes.CLOSE_CHATBOX,
        conversation
    };
};
