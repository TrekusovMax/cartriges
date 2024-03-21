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
          //height: 'calc(100% - 40px)',
          minHeight: 700,
        }}>
        <Sider />
        <Layout.Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout.Content>
  )
}
