import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import RegisterForm from '../components/registerForm'
import LoginForm from '../components/loginForm'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Teacher Tree</title>
      </Head>

      {/* <RegisterForm /> */}
      <LoginForm />
     
    </div>
  )
}
