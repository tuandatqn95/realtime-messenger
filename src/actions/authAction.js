import * as ActionTypes from "../constants/ActionTypes";

export const login = (user, token) => {
    if (token) localStorage.setItem("token", token);
    return {
        type: ActionTypes.LOGIN,
        user
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    return {
        type: ActionTypes.LOGOUT
    };
};

export const authFail = () => {
    return {
        type: ActionTypes.AUTH_FAIL
    };
};
