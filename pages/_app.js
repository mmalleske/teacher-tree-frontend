import '../styles/globals.css'
import { ConfigProvider } from 'antd'
import { UserProvider } from '../contexts/UserContext'
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
        }}>
        <Head>
          <title>Teacher Tree</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
          <link href="https://fonts.googleapis.com/css2?family=Inclusive+Sans:ital@0;1&family=Quicksand:wght@300;400;500&family=Work+Sans:ital,wght@0,100;0,200;1,100&display=swap" rel="stylesheet"></link>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        </Head>
        <Component {...pageProps} />
      </ConfigProvider>
    </UserProvider>
  )
}

export default MyApp
