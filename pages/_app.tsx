import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ShopProvider from '../context/shopContext'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ShopProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ShopProvider>
  )
}

export default MyApp
