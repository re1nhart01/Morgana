import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {Paths, useTypedNavigation} from "../../../bll/NavigationConfig";


type signInFormProps = {};

export const SignInForm: React.FC<signInFormProps> = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
        alert('asdas')

    }

    const onFinishFailed = (error: any) => {
        console.log('Failed:', error);
    }
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="screens_welcome_authForm_form"
        >
            <Form.Item
                label="Username"
                name="username"
                requiredMark="optional"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input placeholder="the_spitefulDuck54" className="screens_welcome_authForm_input screens_global_primary_input" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                requiredMark="optional"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input placeholder="randomStringxddd5421wdq" type="password" className="screens_welcome_authForm_input screens_global_primary_input" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 1, span: 20 }}>
                <Checkbox className="screens_welcome_authForm_checkbox">Remember me</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button className="screens_welcome_authForm_loginBtn" type="primary" htmlType="submit">
                    Log In
                </Button>
            </Form.Item>
        </Form>
    );
}