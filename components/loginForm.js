import { Form, Input, Button, message, Segmented, Space } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

const LoginForm = () => {
    const router = useRouter();
    const [userType, setUserType] = useState("teacher");

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values, { setSubmitting }) => {
            await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false, // Redirect is handled after successful login
            });
            router.push('/teachers/favorites');
        },
    });

    const handleChange = (value) => {
        if (value === "Login as Teacher") {
            setUserType("teacher")
        } else {
            setUserType("parent")
        }
    }

    return (
        <>
            <Segmented onChange={(value) => handleChange(value)} options={["Login as Teacher", "Login as Parent"]} />
            <Form layout='vertical' onFinish={formik.handleSubmit}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email!' },
                        { type: 'email', message: 'Invalid email format!' },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={formik.isSubmitting}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginForm;
