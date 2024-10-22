import '@/styles/globals.css'
import Layout from '@/components/structure/Layout'

export default function App({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}