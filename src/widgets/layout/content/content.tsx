import { Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import { Sider } from '../sider'
import { Breadcrumb } from '../breadcrumb'

export const Content = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout.Content style={{ padding: '0 48px' }}>
      <Breadcrumb />
      <Layout
        style={{
          padding: '24px 0',
          background: colorBgContainer,
          borderRadius: 10,
          minHeight: 800,
        }}>
        <Sider />
        <Layout.Content
          style={{
            padding: '0 24px',
            minHeight: 280,
            borderInlineStart: '1px solid rgba(5, 5, 5, 0.06)',
          }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout.Content>
  )
}
