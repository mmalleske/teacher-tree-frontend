import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import {useRouter} from 'next/router';

const ResetPasswordForm = ({ decodedToken }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: '',
      password_confirmation: '',
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);

        // Make an HTTP POST request to your reset password endpoint
        await axios.post(`${process.env.API_BASE_URL}/auth/reset-password`, {
          email: decodedToken.email,
          password: values.password,
        });

        message.success('Password reset successful');
      } catch (error) {
        console.error('Error resetting password:', error);
        message.error('Password reset failed');
      } finally {
        setLoading(false);
        router.push('/login')
      }
    },
  });

  return (
    <>
      <h2>Enter your new password</h2>
      <Form layout='vertical' onFinish={formik.handleSubmit}>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your new password!' }]}
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
