import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LoginForm from '../components/loginForm'
import { Divider, Card } from 'antd'

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Teacher Tree</title>
      </Head>
      <Card>
          <img src="/assets/images/teacher-tree-logo.webp" />
          <h1>Teacher Tree</h1>
          {/* <Divider /> */}
          <p>Connecting Communities With Classrooms</p>
          <LoginForm />
          <p>New to Teacher Tree? <a href="/register"><u>Create an Account.</u></a></p>
      </Card>
    </div>
  )
}
