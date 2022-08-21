import {HomeScreen} from "../components/global/HomeScreen";
import React from "react";
import {WelcomeContainer} from "../components/global/controllers/WelcomeContainer";
import {useNavigate} from "react-router-dom";
import {SplashScreen} from "../components/global/SplashScreen";


export type Screen = {
    path: string;
    key?: string;
    caseSensitive?: boolean;
    children?: JSX.Element;
    index?: boolean;
    element: JSX.Element;
    name: string;
}

type NavigationConfig = {
    screens: Array<Screen>
    subScreens: Array<Screen>
}

enum ScreensName {
    homeScreen = "HomeContainer",
    welcomeScreen = "WelcomeContainer",
    splashScreen = 'SplashScreen',
}

enum Paths {
    home = '/home/*',
    welcome = '/welcome',
    default = '/'
}

const NavigationConfig: NavigationConfig = {
    screens: [
        {
           element: <HomeScreen />,
           path: Paths.home,
           name: ScreensName.homeScreen,
        },
        {
            element: <WelcomeContainer />,
            path: Paths.welcome,
            name: ScreensName.welcomeScreen,
        },
        {
            element: <SplashScreen />,
            path: Paths.default,
            name: ScreensName.splashScreen,
        }
    ],
    subScreens: []
}

export {NavigationConfig, ScreensName, Paths }