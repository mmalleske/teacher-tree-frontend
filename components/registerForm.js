import { Form, Input, Button, message, Segmented } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import useCustomLogin from '../hooks/useCustomLogin';

const RegisterForm = () => {
    const router = useRouter();
    const [userType, setUserType] = useState("teacher");
    const { register, loading } = useCustomLogin();
    const userTypeParam = router.query.userType;

    useEffect(() => {
        if (userTypeParam) {
            setUserType(userTypeParam);
        } else { 
            setUserType("teacher")
        }
    }, [router.query.userType]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password_confirmation: '',
        },
        onSubmit: async (values) => {
            console.log(values)
            try {
                await register(values.email, values.password, values.password_confirmation, userType);

            } catch (error) {
                // Handle error responses here
                if (error.response && error.response.data && error.response.data.errors) {
                    // Display error messages from the backend
                    const { errors } = error.response.data;
                    console.error(error)
                    // message.error(Object.values(errors).join(', '));
                } else {
                    // Handle other types of errors
                    // message.error('An error occurred during registration.');
                }
            }
        },
    });

    const handleChange = (value) => {
        if (value === "Sign Up as a Teacher/Staff") {
            setUserType("teacher")
        }

        if (value === "Sign Up as a Donor") {
            setUserType("donor")
        }
    }

    const memoizedSegmented = useMemo(() => (
        <Segmented
            style={{ marginBottom: "1rem" }}
            defaultValue={userType === "teacher" ? "Sign Up as a Teacher/Staff" : "Sign Up as a Donor"} // Set the default value based on userType
            onChange={handleChange}
            options={["Sign Up as a Teacher/Staff", "Sign Up as a Donor"]}
        />
    ), [userType, userTypeParam]);

    return (
        <>
           {memoizedSegmented}
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
                    <Button block type="primary" htmlType="submit" loading={loading}>
                        Register as {userType.toUpperCase()}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default RegisterForm;
