import React from "react";
import {SignUpForm} from "./SignUpForm";
import {Button} from "antd";
import {SignInForm} from "./SignInForm";


type signInViewProps = {
    onChangeAuthPress(flag: boolean): void;
};


const SignInView: React.FC<signInViewProps> = ({onChangeAuthPress}) => {
    const onAlreadyAccount = (flag: boolean) => {
        return () => {
            onChangeAuthPress(flag)
        }
    }
    return (
        <div className="screens_welcome_body">
            <div className="screens_welcome_body_titles">
                <div className="screens_welcome_body_titles_container reveal_right">
                    <span className="screens_welcome_authForm_header">Welcome to the Morgana!</span>
                    <span className="screens_welcome_authForm_subheader">RELIABLE TECHNOLOGIES TO MAINTAIN RELATIONSHIPS</span>
                    <span className="screens_welcome_authForm_content">Communicate with friends in voice and video chat with record-breaking
                            stable latency as if you were sitting in the same room. Say hello to your friends,
                            watch them play or draw something along with the screen watching features.</span>
                </div>
            </div>
            <div className="screens_welcome_authForm reveal_left">
                <SignInForm />
                <div className="screens_welcome_authForm_no-account">
                    <span>Doesn't have an account? <Button type="link" onClick={onAlreadyAccount(true)} danger>Sign Up</Button></span>
                </div>
            </div>
        </div>
    )
}

export { SignInView }