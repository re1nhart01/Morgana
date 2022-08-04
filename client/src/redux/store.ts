import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { reducers } from "./index";





export const setupStore = () => {
    return configureStore({
        reducer: reducers,
        devTools: true,
        middleware: [thunk],
    })
}


export type RootState = ReturnType<typeof reducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']