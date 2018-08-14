import * as Types from "../constants/ActionTypes";

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN:
            return true;
        case Types.LOGOUT:
        case Types.AUTH_FAIL:
            return false;
        default:
            return state;
    }
};

export default reducer;
