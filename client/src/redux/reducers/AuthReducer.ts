import {createSlice} from "@reduxjs/toolkit";


const auth_initialState = {}

const AuthSlice = createSlice({
    name: 'AuthSlice',
    initialState: auth_initialState,
    reducers: {
        increment(state, action) {
            state = state + action.payload
        },
    }
})

const auth_actions = AuthSlice.actions;
const auth_reducers = AuthSlice.reducer;

export {auth_actions, auth_reducers, auth_initialState}