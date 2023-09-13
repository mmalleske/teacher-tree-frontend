import { Form, Input, Button, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';

const ForgotPasswordForm = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: async (values) => {
            try {
                setLoading(true);

                // Make a POST request to your forgot password endpoint
                await axios.post(`${process.env.API_BASE_URL}/auth/forgot-password`, {
                    email: values.email,
                });

                message.success('Password reset email sent.');
            } catch (error) {
                console.error('Error sending reset email:', error);
                message.error('Failed to send password reset email.');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <>
            <h2>Forgot Password</h2>
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
