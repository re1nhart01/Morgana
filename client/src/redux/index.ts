import { combineReducers } from "@reduxjs/toolkit";
import { auth_reducers } from "./reducers/AuthReducer";



export const reducers = combineReducers({
    authReducer: auth_reducers
})
