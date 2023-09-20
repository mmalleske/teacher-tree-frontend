import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { Button, Card, Space, Divider } from 'antd'

export default function Home() {
  return (
    <div className={styles.container}>
      <Card bodyStyle={{textAlign: 'center'}}>
        <img className={styles.logo} src="/assets/images/teacher-tree-logo.webp" />
        <h1>Teacher Tree</h1>
        <Divider className={styles.titleDivider} />
        <h3>Connecting Communities with Classrooms</h3>
        <div className={styles.actions}>
          <Button block type="primary" href="/register">Sign Up</Button>
          <Button block type="primary" href="/login">Login</Button>
        </div>
      </Card>
    </div>
  )
}
