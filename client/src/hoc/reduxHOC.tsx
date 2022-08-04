import {Provider} from "react-redux";
import {setupStore} from "../redux/store";
import React from 'react'

export const ReduxHOC = (component: JSX.Element) => {
    return (
        <Provider store={setupStore()}>
            {component}
        </Provider>
    )
}


