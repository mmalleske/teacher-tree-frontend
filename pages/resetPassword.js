import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Head from 'next/head'
import containerStyles from '../styles/Home.module.css'
import styles from "./forgotPassword.module.scss";
import { Divider, Card } from 'antd'
import ResetPasswordForm from '../components/resetPasswordForm';

function ResetPassword() {
    const [token, setToken] = useState('');
    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        // Extract the token from the query parameters when the page loads
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        setToken(tokenParam);

        if (tokenParam) {
            // Decode the token to get user information
            try {
                const decoded = jwt_decode(tokenParam);
                setDecodedToken(decoded);
                console.log(decoded)
            } catch (error) {
                console.error('Error decoding JWT:', error);
            }
        }
    }, []);

    return (
        <div className={containerStyles.container}>
            <Head>
                <title>Teacher Tree</title>
            </Head>
            <Card className={styles.forgotPasswordPage}>
                <img src="/assets/images/teacher-tree-logo.webp" />
                <h1>Teacher Tree</h1>
                <Divider />
                <p>Forgot your password? Enter your email and we will send you a reset link if we have found you in our system.</p>
                {decodedToken ? (
                    <ResetPasswordForm decodedToken={decodedToken} />
                ) : (
                    <h1>An error occured.</h1>
                )}
            </Card>
        </div>
    )
}

export default ResetPassword;
