import React from "react";
import {BrowserRouterProps, Routes} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";


type homeScreenProps = {} & BrowserRouterProps;

const HomeScreen: React.FC<homeScreenProps> = ({}) => {
    console.log('zxczxc')
    const selector = useAppSelector(state => state.authReducer)
    return (
        <div>
            <Routes>

            </Routes>
        </div>
    )
}

export { HomeScreen }