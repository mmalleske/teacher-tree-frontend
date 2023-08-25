import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { ConfigProvider } from 'antd'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: '#00b96b',
          },
        }}>
        <Component {...pageProps} />
      </ConfigProvider>
    </SessionProvider>
  )
}

export default MyApp
