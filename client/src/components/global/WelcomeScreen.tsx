import React from "react";
import {BrowserRouterProps} from "react-router-dom";
import {AnimatedSphere} from "../segments/AnimatedSphere";
import {SignInForm} from "../segments/Auth/SignInForm";
import {Button} from "antd";
import { SignUpForm } from "../segments/Auth/SignUpForm";
import {SignUpView} from "../segments/Auth/SignUpView";
import {SignInView} from "../segments/Auth/SignInView";


type welcomeScreenProps = {
    isSignUp: boolean;
    onChangeAuthPress(flag: boolean): void;
};

const WelcomeScreen: React.FC<welcomeScreenProps> = ({isSignUp, onChangeAuthPress}) => {
    return (
        <div className='screens_welcome'>
            <AnimatedSphere />
                {isSignUp ?
                 <SignUpView onChangeAuthPress={onChangeAuthPress} />
                                        :
                 <SignInView onChangeAuthPress={onChangeAuthPress} />}
        </div>
    )
}


export { WelcomeScreen }