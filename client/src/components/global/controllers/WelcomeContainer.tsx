import React, {useState} from "react";
import {WelcomeScreen} from "../WelcomeScreen";
import {BrowserRouterProps} from "react-router-dom";


type welcomeContainerProps = {} & BrowserRouterProps
type welcomeContainerState = {
    isSignUp: boolean;
}

const WelcomeContainer: React.FC<welcomeContainerProps> = () => {
    const [getState, setState] = useState<welcomeContainerState>({
        isSignUp: false,
    })


    const onChangeAuthPress = (flag: boolean) => {
        setState({...getState, isSignUp: flag})
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