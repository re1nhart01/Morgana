import React from "react";
import {Button, Checkbox, DatePicker, Form, Input, Upload} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {PlusOutlined} from "@ant-design/icons";
import {application} from "../../../bll/GlobalLogic";

type signUpFormProps = {
    onAlreadyAccount(flag: boolean): () => void
};

export const SignUpForm: React.FC<signUpFormProps> = ({onAlreadyAccount}) => {


    const onFinish = async (values: any) => {
        const result = await application.User.registerUser(values)
        if (result.statusCode === 200) {
            alert('You are successfully registered!')
            onAlreadyAccount(false)()
        } else {
            alert('Oops, something went wrong, when you are trying to register! :(')
        }
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
                rules={[{ required: true, message: 'Please input your username!', max: 35, min: 3, whitespace: false }]}
            >
                <Input maxLength={35} placeholder="the_spitefulDuck54" className="screens_welcome_authForm_input screens_global_primary_input" />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                requiredMark="optional"
                rules={[{ required: true, message: 'Please input your password!', max: 75, min: 5, whitespace: false }]}
            >
                <Input  maxLength={75} placeholder="randomStringxddd5421wdq" className="screens_welcome_authForm_input screens_global_primary_input" />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                requiredMark="optional"

                rules={[{ type: "email", required: true, message: 'Please input email correct!', max: 75, min: 5, whitespace: false }]}
            >
                <Input maxLength={75} placeholder="aboba@gmail.com" className="screens_welcome_authForm_input screens_global_primary_input" />
            </Form.Item>
            <Form.Item
                label="Repeat"
                name="repeat"
                requiredMark="optional"
                rules={[{ required: true, message: 'Please repeat your password!', max: 75, min: 5, whitespace: false }]}
            >
                <Input maxLength={75} placeholder="randomStringxddd5421wdq" className="screens_welcome_authForm_input screens_global_primary_input" />
            </Form.Item>
            <Form.Item name="birth"
                       label="Birth"
                       className="ant-form-item-optional"
                       rules={[{ required: false, message: 'Please input your date of birth!' }]}>
                <DatePicker className="screens_global_primary_input" />
            </Form.Item>
            <Form.Item label="About"
                       name="about"
                       className="ant-form-item-optional"
                       rules={[{ required: false, message: 'Please introduce yourself!', max: 500, min: 0, whitespace: false }]}>
                <TextArea maxLength={500} placeholder="Introduce yourself" className="screens_welcome_authForm_input screens_global_primary_input screens_global_primary_textarea" rows={4} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button className="screens_welcome_authForm_loginBtn" type="primary" htmlType="submit">
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
    );
}