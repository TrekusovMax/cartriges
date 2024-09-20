import { Layout } from 'antd'

import { Header } from '../header'

import { Footer } from '../footer'
import { Content } from '../content'

export const MainLayout = () => {
  return (
    <Layout
      style={{
        height: 'calc(100% - 20px)',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
      <Header />
      <Content />
      <Footer />
    </Layout>
  )
}
