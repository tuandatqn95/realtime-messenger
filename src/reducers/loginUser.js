import * as Types from "../constants/ActionTypes";

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN:
            return action.user;
        case Types.LOGOUT:
        case Types.AUTH_FAIL:
            return {};
        default:
            return state;
    }
};

export default reducer;
