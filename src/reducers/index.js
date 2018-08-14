import { combineReducers } from "redux";
import isAuth from "./isAuth";
import loginUser from "./loginUser";
import friends from "./friends";
import chattings from "./chattings";

const reducers = combineReducers({
    isAuth,
    loginUser,
    friends,
    chattings
});

export default reducers;
