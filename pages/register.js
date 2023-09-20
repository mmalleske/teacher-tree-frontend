import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import RegisterForm from '../components/registerForm'
import { Card, Divider } from 'antd'
import Link from 'next/link'

export default function Home() {
    return (
        <div className={styles.container}>            
            <Card bodyStyle={{textAlign: 'center'}}>
                <img className={styles.logo} src="/assets/images/teacher-tree-logo.webp" />
                <h1>Teacher Tree</h1>
                <Divider className={styles.titleDivider} />
                <h3>Connecting Communities With Classrooms</h3>
                <RegisterForm />
                <p>Already a Teacher TreeUser? <Link href="/login"><u>Login Here.</u></Link></p>
            </Card>
        </div>
    )
}
