import Head from 'next/head'
import styles from '../styles/Home.module.css'
import RegisterForm from '../components/registerForm'
import { Card } from 'antd'
import Link from 'next/link'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Teacher Tree</title>
            </Head>
            <Card>
                <img src="/assets/images/teacher-tree-logo.webp" />
                <h1>Teacher Tree</h1>
                <p>Connecting Communities With Classrooms</p>
                <RegisterForm />
                <p>Already a Teacher TreeUser? <Link href="/login"><u>Login Here.</u></Link></p>
            </Card>
        </div>
    )
}
