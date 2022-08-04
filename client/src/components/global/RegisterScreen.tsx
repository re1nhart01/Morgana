import React from "react";
import {BrowserRouter, BrowserRouterProps, Route, Routes} from "react-router-dom";
import {HomeScreen} from "./HomeScreen";


type registerScreenProps = {} & BrowserRouterProps;

const RegisterScreen: React.FC<registerScreenProps> = ({}) => {
    return (
        <div>
            <div>
                home
            </div>
        </div>
    )
}

export { RegisterScreen }