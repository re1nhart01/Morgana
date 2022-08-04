import React from "react";
import {SignUpForm} from "./SignUpForm";
import {Button} from "antd";


type signUpViewProps = {
    onChangeAuthPress(flag: boolean): void;
};


const SignUpView: React.FC<signUpViewProps> = ({onChangeAuthPress}) => {


    const onAlreadyAccount = (flag: boolean) => {
        return () => {
            onChangeAuthPress(flag)
        }
    }
    return (
        <div className="screens_welcome_body screens_welcome_body_register">
                <div className="screens_welcome_registerForm reveal_right">
                    <SignUpForm />
                    <div className="screens_welcome_authForm_no-account">
                        <span>Already have an account? <Button onClick={onAlreadyAccount(false)} type="link" danger>Log In</Button></span>
                    </div>
                </div>
            <div className="screens_welcome_body_titles reveal_left">
                <div className="screens_welcome_body_titles_container">
                    <span className="screens_welcome_authForm_header">Here you can write your account information</span>
                    <span className="screens_welcome_authForm_subheader">@Powered by re1nhart</span>
                    <span className="screens_welcome_authForm_content">
                        Create a place where members of your club or organization can communicate,
                        organize their activities, and most importantly, feel at home.
                        Discord allows you to always stay in touch and communicate throughout the year.
                    </span>
                </div>
            </div>
        </div>
    )
}


export { SignUpView }