import * as Types from "../constants/ActionTypes";

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.OPEN_CHATBOX:
            if (state.some(cvs => cvs.id === action.conversation.id))
                return [...state];
            return [...state, action.conversation];
        case Types.CLOSE_CHATBOX:
            return state.filter(cvs => cvs.id !== action.conversation.id);
        default:
            return [...state];
    }
};

export default reducer;
