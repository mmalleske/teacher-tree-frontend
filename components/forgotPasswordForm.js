import { Form, Input, Button, message, Segmented, Space } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../contexts/UserContext'; // Import the UserContext hook
import useCustomLogin from '../hooks/useCustomLogin'; // Import the custom login hook

const ForgotPasswordForm = () => {
    const [loading, setLoading] = useState();
    
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await login(values.email); // Use the custom login function                              
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

    return (
        <>
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

                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default ForgotPasswordForm;
