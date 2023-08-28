import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button, Card, Space } from 'antd'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Teacher Tree</title>
      </Head>
      <Card>
        <img src="/assets/images/teacher-tree-logo.webp" />
        <h1>Teacher Tree</h1>
        <p>Welcome to Teacher Tree</p>
        <Space>
          <Button block type="primary" href="/register">Sign Up</Button>
          <Button block type="primary" href="/login">Login</Button>
        </Space>
      </Card>
    </div>
  )
}
