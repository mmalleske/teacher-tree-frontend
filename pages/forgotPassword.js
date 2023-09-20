import Head from 'next/head'
import containerStyles from '../styles/Home.module.scss'
import { Divider, Card } from 'antd'
import ForgotPasswordForm from '../components/forgotPasswordForm'
import styles from "./forgotPassword.module.scss";

export default function ForgotPassword() {
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
                <ForgotPasswordForm />
            </Card>
        </div>
    )
}
