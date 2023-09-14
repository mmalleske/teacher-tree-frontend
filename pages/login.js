import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LoginForm from '../components/loginForm'
import { Divider, Card } from 'antd'
import Link from 'next/link'

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Teacher Tree</title>
      </Head>
      <Card>
          <img src="/assets/images/teacher-tree-logo.webp" />
          <h1>Teacher Tree</h1>
          <p>Connecting Communities With Classrooms</p>
          <LoginForm />
          <Link href="/forgotPassword">Forgot Password?</Link>
          <p>New to Teacher Tree? <Link href="/register"><u>Create an Account.</u></Link></p>
      </Card>
    </div>
  )
}
