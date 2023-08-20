import { Form, Input, Button, message, Segmented } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const RegisterForm = () => {
    const router = useRouter();
    const [userType, setUserType] = useState("teacher");

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password_confirmation: '',
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axios.post(`${process.env.API_BASE_URL}/auth/register?userType=${userType}`, values);
                const { data } = response;
                setSubmitting(false);

                // Check if the response indicates success
                if (data) {
                    message.success('New Account Created');

                    // After successful registration, sign in the user
                    await signIn('credentials', {
                        email: values.email,
                        password: values.password,
                        redirect: false
                    });

                    console.log("redirect now dangi")

                    // Redirect the user after signing in
                    router.push('/teacher/dashboard');
                }
            } catch (error) {
                setSubmitting(false);

                // Handle error responses here
                if (error.response && error.response.data && error.response.data.errors) {
                    // Display error messages from the backend
                    const { errors } = error.response.data;
                    message.error(Object.values(errors).join(', '));
                } else {
                    // Handle other types of errors
                    message.error('An error occurred during registration.');
                }
            }
        },
    });

    const handleChange = (value) => {
        if(value === "Sign Up as Teacher") {
            setUserType("teacher")
        } else {
            setUserType("donor")
        }
    } 

    return (
        <>
            <Segmented onChange={(value) => handleChange(value)} options={["Sign Up as a Teacher", "Sign Up as a Donor"]} />
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

                <Form.Item
                    label="Confirm Password"
                    name="password_confirmation"
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Passwords do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Confirm Password"
                        onChange={formik.handleChange}
                        value={formik.values.password_confirmation}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={formik.isSubmitting}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default RegisterForm;
