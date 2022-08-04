import React from "react";
import {BrowserRouterProps, Routes} from "react-router-dom";


type homeScreenProps = {} & BrowserRouterProps;

const HomeScreen: React.FC<homeScreenProps> = ({}) => {
    console.log('zxczxc')
    return (
        <div>
            <Routes>

            </Routes>
        </div>
    )
}

export { HomeScreen }