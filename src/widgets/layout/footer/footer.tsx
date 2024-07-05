import { Layout } from 'antd'

export const Footer = () => {
  return (
    <Layout style={{ textAlign: 'center' }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Layout>
  )
}
