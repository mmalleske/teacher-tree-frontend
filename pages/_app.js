import '../styles/globals.css'
import { ConfigProvider } from 'antd'
import { UserProvider } from '../contexts/UserContext'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
        }}>
        <Component {...pageProps} />
      </ConfigProvider>
    </UserProvider>
  )
}

export default MyApp
