import React, {useState} from "react";
import {WelcomeScreen} from "../WelcomeScreen";
import {BrowserRouterProps} from "react-router-dom";
import {useComponentState} from "../../../hooks/hooks";


type welcomeContainerProps = {} & BrowserRouterProps
type welcomeContainerState = {
    isSignUp: boolean;
}

const WelcomeContainer: React.FC<welcomeContainerProps> = () => {
    const [getState, setState] = useComponentState<welcomeContainerState>({
        isSignUp: false,
    }, () => {console.log('loaded')}, () => {console.log('unloaded')})


    const onChangeAuthPress = (flag: boolean) => {
        setState('isSignUp', flag)
    }


    const screenState = {
        isSignUp: getState.isSignUp,
        onChangeAuthPress
    }
        return (
            <WelcomeScreen {...screenState} />
        )
}


export { WelcomeContainer }