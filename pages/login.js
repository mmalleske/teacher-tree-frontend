import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LoginForm from '../components/loginForm'

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Teacher Tree</title>
      </Head>

      {/* <RegisterForm /> */}
      <img src="/assets/images/teacher-tree-logo.webp" />
      <h1>Teacher Tree</h1>
      <LoginForm />
     
    </div>
  )
}
