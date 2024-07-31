import { Form, Input, Button, message, Segmented, Space } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../contexts/UserContext'; // Import the UserContext hook
import useCustomLogin from '../hooks/useCustomLogin'; // Import the custom login hook

const LoginForm = () => {
    const router = useRouter();
    const [userType, setUserType] = useState("teacher");
    const { setUser } = useUser(); // Use the setUser function from the context
    const { login, loading } = useCustomLogin(); // Use the custom login hook

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await login(values.email, values.password, userType); // Use the custom login function                              
            } catch (error) {
                console.log(error, "Error")
                // Handle specific error codes
                if (error.status === 401) {
                    message.error('Incorrect email or password.');
                } else {
                    console.error("Login failed:", error);
                    message.error('An error occurred during login. Please try again later.');
                }
            }
        },
    });

    const handleChange = (value) => {
        if (value === "Login as School Staff Member") {
            setUserType("teacher")
        } else {
            setUserType("donor")
        }
    }

    return (
        <>
            <Segmented style={{marginBottom: "1rem"}} onChange={(value) => handleChange(value)} options={["Login as School Staff Member", "Login as Helper"]} />
            <br />
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
                        autoCapitalize='off'
                        autoCorrect='off'
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
                    <Button block type="primary" htmlType="submit" loading={loading}>
                        Login as {userType === "teacher" ? "School Staff Member" : "Helper"}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginForm;
